import { Injectable } from '@angular/core';
import { IEmployee } from 'src/app/models/employee-account';
import { HttpService } from 'src/app/services/http-service.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees$: BehaviorSubject<IEmployee[]> = new BehaviorSubject<IEmployee[]>([]);

  constructor(
    private httpService: HttpService
  ) { }

  getEmployeeList() {
    return this.httpService.getWithCustomURL<IEmployee[]>({ controller: 'Accounts', url: `Accounts/employee-account/get-list/` })
  }

  getEmployeeById(empId: string) {
    return this.httpService.getById<IEmployee>({controller: 'Accounts', op: 'employee-info'}, empId);
  }

  search(data: IEmployee) {
    return this.httpService.search<IEmployee[]>({ controller: 'Accounts', data}).pipe(
      tap((res) => {
        if(res?.length) {
          this.employees$.next(res);
        }
      })
    );
  }

  remove(empId: string){
    return this.httpService.delete<IEmployee>({controller: 'Accounts'}, empId).pipe(
      tap(() => {
        const employees = this.employees$.getValue();
        const updatedEmployees = employees.filter(employee => employee.id !== empId);
        this.employees$.next(updatedEmployees);
      })
    );
  }
}
