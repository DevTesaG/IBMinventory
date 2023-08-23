import { Component, OnInit, ViewChild } from '@angular/core';
import { Material } from 'src/app/models/catalogue/material.model';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css'],
})
export class MaterialListComponent implements OnInit {

  @ViewChild(PaginationComponent) paginator?:PaginationComponent;
  currentMaterial?: Material;
  currentIndex = -1;
  q = '';
  queryChange?:string

  constructor() { }

  ngOnInit(): void {
   }

  filter(){
    this.queryChange = this.q
  }

  refreshList(){
    this.paginator?.resetPagination()
    this.currentMaterial = undefined;
    this.currentIndex = -1;  
  }
  getSelectedElement(element: any): void {
    this.currentMaterial = element.element;
    this.currentIndex = element.index;
  }

}
