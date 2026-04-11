import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../core/models/employee.models';

@Pipe({
  name: 'employeeName',
  standalone: true,
})
export class EmployeeNamePipe implements PipeTransform {
  transform(employee: Employee | null | undefined): string {
    if (!employee) return '';
    return `${employee.first_name} ${employee.last_name}`.trim();
  }
}