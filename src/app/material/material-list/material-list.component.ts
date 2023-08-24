import { Component, OnInit, ViewChild } from '@angular/core';
import { Material } from 'src/app/models/catalogue/material.model';
import { FormProp } from 'src/app/models/form-prop.model';
import { MaterialService } from 'src/app/services/material.service';
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
  formObj: FormProp[][];
  message = '';


  constructor(private materialService: MaterialService) { 
    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text')],
      [new FormProp('Descripcion' ,'description', 'text')],
      [
        new FormProp('Area' ,'area', 'text'), 
        new FormProp('Zona' ,'zone', 'text'),
        new FormProp('Posicion' ,'position', 'text')
      ],
    ]
  }

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
    this.message = ''
  }

  submit(element:any){
    this.updateMaterial(element.element)
  }

  onReject(){
    this.deleteMaterial()
  }

  updateMaterial(material:Material): void {
    if(!this.currentMaterial) return 

    if (this.currentMaterial.id) {
      this.materialService.update(this.currentMaterial.id, material)
        ?.then(() => this.message = 'El material fue actualizado satisfactoriamente!')
        .catch(err => console.log(err));
    }
  }

  deleteMaterial(): void {
    if(!this.currentMaterial) return 

    if (this.currentMaterial.id) {
      this.materialService.delete(this.currentMaterial.id)
        .then(() => {
          this.refreshList()
          this.message = 'El material fue actualizado satisfactoriamente!';
        })
        .catch(err => console.log(err));
    }
  }

}
