import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AutofocusDirective } from '../../../shared/directives/autofocus.directive';

@Component({
  selector: 'app-employee-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, AutofocusDirective],
  templateUrl: './employee-search-bar.component.html',
  styleUrl: './employee-search-bar.component.css',
})
export class EmployeeSearchBarComponent {
  @Output() search = new EventEmitter<{ designation: string; department: string }>();
  @Output() reset = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    designation: [''],
    department: [''],
  });

  submit(): void {
    const value = this.form.getRawValue();

    this.search.emit({
      designation: value.designation.trim(),
      department: value.department.trim(),
    });
  }

  clear(): void {
    this.form.setValue({
      designation: '',
      department: '',
    });

    this.reset.emit();
  }
}