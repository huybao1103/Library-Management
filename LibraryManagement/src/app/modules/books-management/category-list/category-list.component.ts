import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { AuthorService } from '../../authors-management/service/author.service';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  searchName = "";
  constructor(
    private httpService: HttpService,
    private route: Router,
  ) {
  }
ngOnInit(): void {
  
}

}
