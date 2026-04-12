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
    errorPolicy: 'all',
  }).valueChanges.pipe(
    map(result => {
      console.log('getEmployees raw Apollo result:', result);

      if (result.error) {
        throw result.error;
      }

      return (result.data?.getEmployees ?? []) as Employee[];
    })
  );
}

getEmployeeById(id: string): Observable<Employee> {
  return this.apollo.watchQuery<{ getEmployeeById: Employee }>({
    query: GET_EMPLOYEE_BY_ID_QUERY,
    variables: { id },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  }).valueChanges.pipe(
    map(result => {
      console.log('getEmployeeById raw Apollo result:', result);

      if (result.error) {
        throw result.error;
      }

      if (!result.data?.getEmployeeById) {
        throw new Error('Employee not found.');
      }

      return result.data.getEmployeeById as Employee;
    })
  );
}

searchEmployees(designation?: string, department?: string): Observable<Employee[]> {
  return this.apollo.watchQuery<{ searchEmployees: Employee[] }>({
    query: SEARCH_EMPLOYEES_QUERY,
    variables: {
      designation: designation || null,
      department: department || null,
    },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  }).valueChanges.pipe(
    map(result => {
      console.log('searchEmployees raw Apollo result:', result);

      if (result.error) {
        throw result.error;
      }

      return (result.data?.searchEmployees ?? []) as Employee[];
    })
  );
}
  addEmployee(input: AddEmployeeInput): Observable<Employee> {
    return this.apollo.mutate<{ addEmployee: Employee }>({
      mutation: ADD_EMPLOYEE_MUTATION,
      variables: { input },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }],
    }).pipe(
      map(result => {
        if (!result.data?.addEmployee) {
          throw new Error('Add employee failed.');
        }
        return result.data.addEmployee;
      })
    );
  }

  updateEmployee(id: string, input: UpdateEmployeeInput): Observable<Employee> {
    return this.apollo.mutate<{ updateEmployee: Employee }>({
      mutation: UPDATE_EMPLOYEE_MUTATION,
      variables: { id, input },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }],
    }).pipe(
      map(result => {
        if (!result.data?.updateEmployee) {
          throw new Error('Update employee failed.');
        }
        return result.data.updateEmployee;
      })
    );
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.apollo.mutate<{ deleteEmployee: Employee }>({
      mutation: DELETE_EMPLOYEE_MUTATION,
      variables: { id },
      refetchQueries: [{ query: GET_EMPLOYEES_QUERY }],
    }).pipe(
      map(result => {
        if (!result.data?.deleteEmployee) {
          throw new Error('Delete employee failed.');
        }
        return result.data.deleteEmployee;
      })
    );
  }
}