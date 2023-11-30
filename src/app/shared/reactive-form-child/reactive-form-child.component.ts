import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reactive-form-child',
  templateUrl: './reactive-form-child.component.html',
  styleUrls: ['./reactive-form-child.component.css']
})
export class ReactiveFormChildComponent implements OnInit {

  @Input() prop?:any;
  @Input() label?:any;



  constructor() { }

  ngOnInit(): void {
    console.log(this.prop)
  }

}
