import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  ADD_EMPLOYEE_MUTATION,
  DELETE_EMPLOYEE_MUTATION,
  GET_EMPLOYEE_BY_ID_QUERY,
  GET_EMPLOYEES_QUERY,
  SEARCH_EMPLOYEES_QUERY,
  UPDATE_EMPLOYEE_MUTATION,
} from '../../graphql/employee.graphql';
import { AddEmployeeInput, Employee, UpdateEmployeeInput } from '../models/employee.models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apollo = inject(Apollo);

  getEmployees(): Observable<Employee[]> {
    return this.apollo.watchQuery<{ getEmployees: Employee[] }>({
      query: GET_EMPLOYEES_QUERY,
      fetchPolicy: 'no-cache',
    }).valueChanges.pipe(map(result => result.data.getEmployees));
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.apollo.watchQuery<{ getEmployeeById: Employee }>({
      query: GET_EMPLOYEE_BY_ID_QUERY,
      variables: { id },
      fetchPolicy: 'no-cache',
    }).valueChanges.pipe(map(result => result.data.getEmployeeById));
  }

  searchEmployees(designation?: string, department?: string): Observable<Employee[]> {
    return this.apollo.watchQuery<{ searchEmployees: Employee[] }>({
      query: SEARCH_EMPLOYEES_QUERY,
      variables: {
        designation: designation || null,
        department: department || null,
      },
      fetchPolicy: 'no-cache',
    }).valueChanges.pipe(map(result => result.data.searchEmployees));
  }

  addEmployee(input: AddEmployeeInput): Observable<Employee> {
    return this.apollo.mutate<{ addEmployee: Employee }>({
      mutation: ADD_EMPLOYEE_MUTATION,
      variables: { input },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }],
    }).pipe(map(result => result.data!.addEmployee));
  }

  updateEmployee(id: string, input: UpdateEmployeeInput): Observable<Employee> {
    return this.apollo.mutate<{ updateEmployee: Employee }>({
      mutation: UPDATE_EMPLOYEE_MUTATION,
      variables: { id, input },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }],
    }).pipe(map(result => result.data!.updateEmployee));
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.apollo.mutate<{ deleteEmployee: Employee }>({
      mutation: DELETE_EMPLOYEE_MUTATION,
      variables: { id },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }],
    }).pipe(map(result => result.data!.deleteEmployee));
  }
}