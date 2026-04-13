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
    searchType: ['all'],
    searchTerm: [''],
  });

  submit(): void {
    const { searchType, searchTerm } = this.form.getRawValue();
    const term = searchTerm.trim();

    if (!term) {
      this.reset.emit();
      return;
    }

    if (searchType === 'department') {
      this.search.emit({ designation: '', department: term });
      return;
    }

    if (searchType === 'designation') {
      this.search.emit({ designation: term, department: '' });
      return;
    }

    this.search.emit({ designation: term, department: term });
  }

  clear(): void {
    this.form.setValue({
      searchType: 'all',
      searchTerm: '',
    });

    this.reset.emit();
  }
}