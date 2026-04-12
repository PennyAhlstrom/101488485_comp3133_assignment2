import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { UploadService } from '../../../core/services/upload.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ErrorMessageComponent],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly employeeService = inject(EmployeeService);
  private readonly uploadService = inject(UploadService);
  private readonly notificationService = inject(NotificationService);

  employeeId: string | null = null;
  isEditMode = false;
  isSubmitting = false;
  errorMessage = '';
  fileError = '';

  readonly form = this.fb.nonNullable.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    designation: ['', Validators.required],
    salary: [1000, [Validators.required, Validators.min(1000)]],
    date_of_joining: ['', Validators.required],
    department: ['', Validators.required],
    employee_photo: [''],
  });

  get f() {
    return this.form.controls;
  }

  get photoPreview(): string {
    return this.form.controls.employee_photo.value?.trim() || '';
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.employeeId;

    if (!this.employeeId) return;

    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (employee) => {
        this.form.patchValue({
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          gender: employee.gender,
          designation: employee.designation,
          salary: employee.salary,
          date_of_joining: this.toDateInputValue(employee.date_of_joining),
          department: employee.department,
          employee_photo: employee.employee_photo ?? '',
        });
      },
      error: (error) => {
        this.errorMessage = error?.message || 'Unable to load employee.';
      },
    });
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    this.fileError = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.fileError = 'Please select an image file.';
      input.value = '';
      return;
    }

    try {
      const uploadedValue = await this.uploadService.uploadFile(file);
      this.form.patchValue({ employee_photo: uploadedValue });
    } catch (error) {
      this.fileError = error instanceof Error ? error.message : 'Image upload failed.';
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const rawValue = this.form.getRawValue();

    const payload = {
      ...rawValue,
      salary: Number(rawValue.salary),
    };

    const request =
      this.isEditMode && this.employeeId
        ? this.employeeService.updateEmployee(this.employeeId, payload)
        : this.employeeService.addEmployee(payload);

    request.subscribe({
      next: (employee) => {
        this.isSubmitting = false;
        this.notificationService.success(
          this.isEditMode ? 'Employee updated successfully.' : 'Employee created successfully.'
        );
        this.router.navigate(['/employees', employee.id]);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error?.message || 'Save failed.';
        this.notificationService.error(this.errorMessage);
      },
    });
  }

  private toDateInputValue(value: string | null | undefined): string {
    if (!value) return '';
    return value.length >= 10 ? value.slice(0, 10) : value;
  }
}