import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {
  value: any[] = [];
  title: string = '';

  @ViewChild('dt') dt: Table | undefined;

  constructor(private modal: NgbActiveModal) {}

  ngOnInit(): void {
    
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  close() {
    this.modal.close();
  }
}
