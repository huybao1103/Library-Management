import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthor } from 'src/app/models/author.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-authors-management',
  templateUrl: './authors-management.component.html',
  styleUrls: ['./authors-management.component.css']
})
export class AuthorsManagementComponent implements OnInit {
  authorData: IAuthor[] = [];
  authorById: IAuthor | undefined;

  constructor(
    private httpService: HttpService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // /api/Authors
    this.httpService.getAll<IAuthor[]>({ controller: 'Authors' }).subscribe({
      next: (resp) => {
        
        if(resp.body)
          this.authorData = resp.body;

        console.log(this.authorData);
      }
    })
  }

  edit(id?: string) {
    console.log('selected author id ' + id);
    this.route.navigate([{ outlets: { modal: ['author', 'edit', id] } }]);
  }
}
