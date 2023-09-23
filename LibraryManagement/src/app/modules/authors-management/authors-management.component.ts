import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-authors-management',
  templateUrl: './authors-management.component.html',
  styleUrls: ['./authors-management.component.css']
})
export class AuthorsManagementComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement!: DataTableDirective;

  authors = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nvan@example.com',
      phone: '0123456789'
    }
  ];
  author = {
    id: undefined as number | undefined,
    name: '',
    email: '',
    phone: ''
  };
  searchQuery = '';

  constructor() {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };
  }

  ngAfterViewInit(): void {
    this.refreshDataTable();
  }

  refreshDataTable(): void {
    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtOptions = Object.assign({}, this.dtOptions);
      });
    }
  }
  addAuthor(): void {

  }

  deleteAuthor(index: number): void {
    this.authors.splice(index, 1);
    this.refreshDataTable();
  }

  editAuthor(index: number): void {
    const editedAuthor = Object.assign({}, this.authors[index]);
    if (editedAuthor.id === undefined || editedAuthor.id === null) {
      editedAuthor.id = null as unknown as number;
    }
    this.author = editedAuthor;
    this.authors.splice(index, 1);
    this.refreshDataTable();
  }

  get filteredAuthors(): any[] {
    // Filter authors based on the search query
    if (this.searchQuery) {
      const searchTerm = this.searchQuery.toLowerCase();
      return this.authors.filter(author => {
        return author.name.toLowerCase().includes(searchTerm) ||
               author.email.toLowerCase().includes(searchTerm) ||
               author.phone.toLowerCase().includes(searchTerm);
      });
    } else {
      return this.authors;
    }
  }
}
