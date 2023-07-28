import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Material } from 'src/app/models/catalogue/material.model';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { MaterialService } from 'src/app/services/material.service';
import { Timestamp } from 'firebase/firestore'

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent implements OnInit {

  @Input() material: Material = new Material();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  
  currentMaterial: Material = {}

  
  
  income = 0
  outflow = 0
  message = '';

  constructor(private materialService: MaterialService, private reportService: InvRMService) {}

  ngOnInit(): void {
    this.currentMaterial = this.material
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentMaterial = { ...this.material };
  }

  updateMaterial(): void {
    const data = {
      name: this.currentMaterial.name,
      description: this.currentMaterial.description,
    };

    if (this.currentMaterial.id) {
      this.materialService.update(this.currentMaterial.id, data)
        ?.then(() => this.message = 'The Material was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteMaterial(): void {
    if (this.currentMaterial.id) {
      this.materialService.delete(this.currentMaterial.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The Material was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
