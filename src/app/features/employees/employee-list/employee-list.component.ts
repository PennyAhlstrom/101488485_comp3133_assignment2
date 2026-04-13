import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.models';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { EmployeeSearchBarComponent } from '../employee-search-bar/employee-search-bar.component';
import { NotificationService } from '../../../core/services/notification.service';
import { EmployeeNamePipe } from '../../../shared/pipes/employee-name.pipe';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    EmptyStateComponent,
    EmployeeSearchBarComponent,
    EmployeeNamePipe,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  employees: Employee[] = [];
  isLoading = true;
  errorMessage = '';

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
        this.errorMessage = error?.message || 'Unable to load employees.';
        this.employees = [];
        this.isLoading = false;
      },
    });
  }

  onSearch(criteria: { designation: string; department: string }): void {
    const designation = criteria.designation.trim();
    const department = criteria.department.trim();

    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.searchEmployees(designation, department).subscribe({
      next: (employees) => {
        this.employees = employees;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error?.message || 'Search failed.';
        this.employees = [];
        this.isLoading = false;
      },
    });
  }

  viewAll(): void {
    this.loadEmployees();
  }

  viewEmployee(id: string): void {
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employees', id, 'edit']);
  }

  deleteEmployee(employee: Employee): void {
    const confirmed = window.confirm(
      `Delete ${employee.first_name} ${employee.last_name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    this.employeeService.deleteEmployee(employee.id).subscribe({
      next: () => {
        this.notificationService.success('Employee deleted successfully.');
        this.employees = this.employees.filter((item) => item.id !== employee.id);
      },
      error: (error) => {
        this.errorMessage = error?.message || 'Delete failed.';
        this.notificationService.error(this.errorMessage);
      },
    });
  }
}