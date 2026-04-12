import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.models';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { EmployeeSearchBarComponent } from '../employee-search-bar/employee-search-bar.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    EmptyStateComponent,
    EmployeeSearchBarComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);

  employees: Employee[] = [];
  isLoading = true;
  errorMessage = '';
  displayedColumns = ['name', 'email', 'designation', 'department', 'salary', 'actions'];

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('getEmployees error:', error);
        this.errorMessage =
          error?.graphQLErrors?.[0]?.message ||
          error?.message ||
          'Unable to load employees.';
        this.isLoading = false;
      },
    });
  }

  onSearch(criteria: { designation: string; department: string }): void {
    if (!criteria.designation && !criteria.department) {
      this.loadEmployees();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.searchEmployees(criteria.designation, criteria.department).subscribe({
      next: (employees) => {
        this.employees = employees;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('searchEmployees error:', error);
        this.errorMessage =
          error?.graphQLErrors?.[0]?.message ||
          error?.message ||
          'Search failed.';
        this.employees = [];
        this.isLoading = false;
      },
    });
  }

  viewEmployee(id: string): void {
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employees', id, 'edit']);
  }

  deleteEmployee(id: string): void {
    const confirmed = window.confirm('Delete this employee?');
    if (!confirmed) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: (error) => {
        this.errorMessage = error?.message || 'Delete failed.';
      },
    });
  }
}
