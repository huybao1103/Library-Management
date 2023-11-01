import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/models/employee-account';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { EmployeeService } from '../service/employee-service.service';
import { EmployeeSearch } from './employee-search';
import { Observable, filter, first, map, of, tap } from 'rxjs';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ToastService } from 'src/app/services/toast.service';
import { FilterMatchMode, FilterService } from 'primeng/api';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { MessageService } from 'primeng/api';
import { DialogService} from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-employee-account-list',
  templateUrl: './employee-account-list.component.html',
  styleUrls: ['./employee-account-list.component.css'],
  providers: [DialogService, MessageService],
})
export class EmployeeAccountListComponent implements OnInit {
  ngOnInit(): void {
    this.loadData();
    //this.getRoles();
  }
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
  employee: IEmployee[] = [
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      joinDate: '01/01/2023',
      roleId: 'Admin',
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987654321',
      joinDate: '02/01/2023',
      roleId: 'User',
    },
  ];
  roles: IComboboxOption[] = [
    {
      value: 'Admin',
      label: 'Admin',
    },
    {
      value: 'User',
      label: 'User',
    },
  ];
  allRoles: IComboboxOption[] = [];
  selectedRole: string = "";

  roleSearchName: string = "All";

  employees$?: Observable<IEmployee[] | null>;

  /*fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        roles: this.employeeService.getEmployeeOption(),
      }
    }
  };*/

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
    private filterServive: FilterService,
    private toastService: ToastService,
    private employeeService: EmployeeService,
    private confirmDialogService: ConfirmDialogService,

  ) {}

  /*applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }*/

  loadData() {
    this.employees$ = this.employeeService.getEmployeeList(this.selectedRole);
    //this.fields = EmployeeSearch();
  }

  /*getRoles() {
    this.employeeService.getEmployeeOption().subscribe({
      next: (res) => {
        if(res) {
          this.roles = [...this.allRoles] = [{ value: '', label: 'All' }, ...res];
        }
      }
    })
  }

  roleChange(roleId: string) {
    if(roleId === 'all') {
      this.selectedRole = '';
      this.loadData();
    } else if(roleId !== this.selectedRole) {
      this.selectedRole = roleId;
      this.loadData();
    }
  }

  roleSearch(text: string) {
    this.roles = [...this.allRoles];
    if(text) {
      this.roleSearchName = text.trim();

      this.roles = this.allRoles.filter(role => {
        return this.filterServive.filters[FilterMatchMode.CONTAINS](role.label, this.roleSearchName) ? role : ''
      });
    }
  }*/
  
  editItem(itemId: string) {
    this.router.navigate([{ outlets: { modal: ['employee-account-list', 'edit', itemId] } }]);
  }

  search() {
    console.log('here')
    this.employees$ = this.employeeService.search(this.data);
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
                this.toastService.show(MessageType.success, 'Delete Publisher Successfully');
                this.getData();
              },
              error: (err: any) => {
                this.toastService.show(MessageType.error, 'Error deleting publisher');
              },
            });
          }
        });
    } else {
      console.error('category.id is undefined');
    }
  }
}
