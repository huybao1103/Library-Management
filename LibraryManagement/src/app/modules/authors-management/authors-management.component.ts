import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthor } from 'src/app/models/author.model';
import { HttpService } from 'src/app/services/http-service.service';
import { AuthorService } from './service/author.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authors-management',
  templateUrl: './authors-management.component.html',
  styleUrls: ['./authors-management.component.css']
})
export class AuthorsManagementComponent implements OnInit {
  authorData: IAuthor[] = [];
  author$?: Observable<IAuthor[] | null>;

  constructor(
    private httpService: HttpService,
    private route: Router,
    private authorService: AuthorService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // /api/Authors
    // this.authorService.getAll().subscribe({
    //   next: (resp) => {
    //     if(resp)
    //       this.authorData = resp;

    //     console.log(this.authorData);
    //   }
    // })

    this.author$ = this.authorService.getAll();
  }

  edit(id?: string) {
    console.log('selected author id ' + id);
    this.route.navigate([{ outlets: { modal: ['author', 'edit', id] } }]);
  }
}
