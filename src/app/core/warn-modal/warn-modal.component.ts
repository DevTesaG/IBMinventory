import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-warn-modal',
  templateUrl: './warn-modal.component.html',
  styleUrls: ['./warn-modal.component.css']
})
export class WarnModalComponent implements OnInit {

  @Input() btnMessage?: string = 'Continuar';
  @Input() modalMessage?: string = '¿ Desea continuar con este proceso ? ';
  @Output() continue: EventEmitter<boolean> = new EventEmitter();
  
  constructor() {
  }

  ngOnInit(): void {
  }


  modalContinue(cont: boolean) {
    this.continue.emit(cont)
  }



}
