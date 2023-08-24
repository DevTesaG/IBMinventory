import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  constructor() { }

  reports?: any[];
  reportPath:string = '/FPreport'
  sDate:any;
  nDate:any;
  query = undefined;
  queryChange?:string = undefined;

  ngOnInit(): void {
  }


  fetchedArray(array:any){
    this.reports = array
  }


  filter(): void {    
    this.queryChange = this.query
  }

}
