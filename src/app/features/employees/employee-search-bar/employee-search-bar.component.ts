import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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
    this.search.emit(this.form.getRawValue());
  }

  clear(): void {
    this.form.reset({ designation: '', department: '' });
    this.reset.emit();
  }
}