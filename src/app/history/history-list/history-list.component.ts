import { Component, OnInit, SimpleChanges} from '@angular/core';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  constructor(private audit: AuditService) { }

  reports?: any[];
  reportPath:string = '/FPreport'
  reportPathChange:string = '/FPreport' 
  sDate:any;
  nDate:any;
  query = undefined;
  queryChange?:string = undefined;

  ngOnInit(): void {
  }

  fetchedArray(array:any){
    this.reports = array
  }

  invTotal(stock:any){
    return stock.wating + stock.commited + stock.available + (stock.watingCommited ? stock.watingCommited : 0)
  }

  deleteAudit(cont:boolean){
    if(!cont) return
    this.audit.deleteAll()
  }

  rootChanged(e:any){
    this.query = undefined
    this.queryChange = undefined
  }

  filter(): void {
    this.queryChange = this.query
  }

}
