import { Injectable } from '@angular/core';
import { IEmployee } from 'src/app/models/employee-account';
import { HttpService } from 'src/app/services/http-service.service';
import { BehaviorSubject, tap } from 'rxjs';
import { IComboboxOption } from 'src/app/models/combobox-option.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  addEmployee(data: IEmployee) {
    throw new Error('Method not implemented.');
  }
  private employees$: BehaviorSubject<IEmployee[]> = new BehaviorSubject<IEmployee[]>([]);

  constructor(
    private httpService: HttpService
  ) { }

  getEmployeeList() {
    return this.httpService.getWithCustomURL<IEmployee[]>({ controller: 'Accounts', url: `Accounts/employee-account/get-list` })
  }

  getEmployeeById(empId: string) {
    return this.httpService.getById<IEmployee>({controller: 'Accounts', op: 'employee-info'}, empId);
  }

 saveEmployee(data: IEmployee) {
    return this.httpService.saveWithCustomURL<IEmployee>({ controller: 'Accounts', data, url: `Accounts/save-employee-account`})
  }

  getEmployeeOption() {
    return this.httpService.getOption<IComboboxOption[]>({ controller: 'Accounts' });
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
      tap(() => this.updateEmployeeState(undefined, empId))
    );
  }

  private updateEmployeeState(res?: IEmployee, deletedEmployeeId?: string, ) {
    let old = this.employees$.value;
  
    if(res) {
      const updated = old.find(p => p.id === res.id);
      
      old = updated ? old.filter(p => p.id !== updated.id) : old;
  
      this.employees$.next([res, ...old]);
    } else if(deletedEmployeeId) {
      old = old.filter(p => p.id !== deletedEmployeeId);
  
      this.employees$.next([...old]);
    }
  }

}
