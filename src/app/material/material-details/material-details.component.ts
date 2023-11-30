import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Material } from 'src/app/models/catalogue/material.model';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { MaterialService } from 'src/app/services/material.service';
import { FormProp } from 'src/app/models/form-prop.model';
import { merge } from 'rxjs';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent implements OnInit {

  @Input() material: Material = new Material();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  
  currentMaterial: Material = {}
  formObj: FormProp[][];

  message = '';

  constructor(private materialService: MaterialService, private provService: ProviderService) {
    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text').setReadOnly(true)],
      [new FormProp('Descripcion' ,'description', 'text')],
      [new FormProp('Area', 'area', 'text'),new FormProp('Zona', 'zone', 'text'), new FormProp('Posicion', 'position', 'text') ]
    ]
  }

  ngOnInit(): void {
    this.currentMaterial = this.material
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentMaterial = { ...this.material };
  }

  submit(material:Material): void {
    this.currentMaterial = material
    this.updateMaterial()
  }

  updateMaterial(): void {
    const {name, ...data} = this.currentMaterial

    if (this.currentMaterial.id) {
      this.materialService.update(this.currentMaterial.id, data)
        ?.then(() => this.message = 'El material fue actualizado correctamente!')
        .catch(err => console.log(err));
    }
  }

  deleteMaterial(): void {
    if (this.currentMaterial.id) {
      merge(this.materialService.delete(this.currentMaterial.id), this.provService.delete(this.currentMaterial.id)).subscribe({
        complete: () => {
          this.refreshList.emit();
          this.message = 'El material fue eliminado correctamente!';
        },
        error: ()=> alert('Error inesperado; porfavor intente de nuevo')
      })
    }
  }
}
