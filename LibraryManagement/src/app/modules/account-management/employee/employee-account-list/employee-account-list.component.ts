import { SessionService } from 'src/app/services/session.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/models/employee-account';
import { EmployeeService } from '../service/employee-service.service';
import { Observable} from 'rxjs';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { MessageService } from 'primeng/api';
import { DialogService} from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ModuleEnum } from 'src/app/enums/module-enum';

@Component({
  selector: 'app-employee-account-list',
  templateUrl: './employee-account-list.component.html',
  styleUrls: ['./employee-account-list.component.css'],
  providers: [DialogService, MessageService],
})

export class EmployeeAccountListComponent implements OnInit {

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  @ViewChild('dt') dt: Table | undefined;

  employees$?: Observable<IEmployee[] | null>;

  data: IEmployee = {
    name: '',
    email: '',
    phone: '',
    joinDate: '',
    roleId: '',
    accountId: '',
    };
    
  constructor(
    private router: Router,
    private toastService: ToastService,
    private employeeService: EmployeeService,
    private confirmDialogService: ConfirmDialogService,
    private sessionService: SessionService

  ) {}

  ngOnInit(): void {
    if(!this.sessionService.getModulePermission(ModuleEnum.EmployeeManagement)?.access)
        this.router.navigate([''])

    this.getData();
  }

  editItem(itemId: string) {
    this.router.navigate([{ outlets: { modal: ['employee-account-list', 'edit', itemId] } }]);
  }

  getData() {
    this.employees$ = this.employeeService.getEmployeeList();
  }

  deleteEmployee(employee: IEmployee) {
    const employeeId = employee?.id; 

    if (employeeId !== undefined) {
      this.confirmDialogService.showConfirmDialog('Are you sure you want to delete ' + employee.name + '?')
        .subscribe((result) => {
          if (result) {
            this.employeeService.remove(employeeId).subscribe({
              next: () => {
                this.toastService.show(MessageType.success, 'Delete Employee Account Successfully');
                this.getData();
              },
              error: (err: any) => {
                this.toastService.show(MessageType.error, 'Error deleting employee account');
              },
            });
          }
        });
    } else {
      console.error('employee.id is undefined');
    }
  }
}
