import { Component, OnInit, ViewChild } from '@angular/core';
import { Material } from 'src/app/models/catalogue/material.model';
import { FormProp } from 'src/app/models/form-prop.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { MaterialService } from 'src/app/services/material.service';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css'],
})
export class MaterialListComponent implements OnInit {

  @ViewChild(PaginationComponent) paginator?:PaginationComponent;
  currentMaterial: Material = {};
  currentIndex = -1;
  q = '';
  queryChange?:string
  formObj: FormProp[][];
  message = '';
  userRole?:string = 'a';

  constructor(private materialService: MaterialService, private auth:AuthService) { 
    // this.auth.user$.subscribe((data => this.userRole = data?.userRole))

    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text').setReadOnly(true)],
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

   isMaterial(){
    return Object.keys(this.currentMaterial).length != 0
   }

  filter(){
    this.queryChange = this.q
  }

  refreshList(){
    this.paginator?.resetPagination()
    this.currentMaterial = {};
    this.currentIndex = -1;  
  }
  
  getSelectedElement(element: any): void {
    this.currentMaterial = element.element;
    this.currentIndex = element.index;
    this.message = ''
  }

  submit(material:Material){
    this.currentMaterial = material
    this.updateMaterial()
  }

  updateMaterial(): void {
    const {name, ...data} = this.currentMaterial
    if(!this.currentMaterial) return 

    if (this.currentMaterial.id) {
      this.materialService.update(this.currentMaterial.id, data)
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
          this.message = 'El material fue eliminado satisfactoriamente!';
        })
        .catch(err => console.log(err));
    }
  }

}
