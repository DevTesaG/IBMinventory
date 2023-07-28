import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { invFinishedProduct } from 'src/app/models/inventory/invFinishedProduct.model';
import { InvRawMaterial } from 'src/app/models/inventory/invRawMaterial.model';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { Timestamp } from 'firebase/firestore'
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  constructor(private auditService: AuditService, private authService: AuthService) { }


  
  // @Input() product?: Product;
  // @Output() rL: EventEmitter<any> = new EventEmitter();

  reportsRM?: any[];
  // reportsFP?: invFinishedProduct[];
  currentRM?: InvRawMaterial;
  currentFP?: invFinishedProduct;
  
  showReportFP = false;
  showAudit = false;
  currentIndex = -1;
  title = '';
  
  query = undefined;
  sDate:any;
  nDate:any;
  fsdate:any;
  filter:boolean = false;

  queryChange?:string = undefined;
  areaFilter= '';
  id = ''

  productsPerCall = 2;
  lastInResponses?:any[] = []

  disableNext = false;
  disablePrev = true;

  response:any;
  productMaterials:any[] = []

  UserName?:string;


  ngOnInit(): void {
    // this.product = history.state
    this.nextPage(true)
    // this.showAudit = true;
    this.changeService()

    this.authService.user$.subscribe((data => this.UserName = data?.displayName))
  }


  nextPage(direction: boolean) {
  
  var anchor:any;
  if(direction){
    if(this.disableNext) return;
    
    if(this.reportsRM?.length){
      this.lastInResponses?.push(this.reportsRM[this.reportsRM.length - 1])
    }  
    anchor = this.lastInResponses?.length ? this.lastInResponses[this.lastInResponses?.length - 1]: undefined;
  }else{
    if(this.disablePrev) return;
    this.lastInResponses?.pop();
    anchor = this.lastInResponses?.pop();
  }
  
  
    console.log(this.queryChange)
    var req;
    if(this.queryChange){
      req = this.auditService.filterByDateBatch(Timestamp.fromDate(new Date(this.sDate)), Timestamp.fromDate(new Date(this.nDate)),this.queryChange, this.productsPerCall, anchor) as AngularFirestoreCollection<Object>
    }else{
      req = this.auditService.getNextBatch(this.productsPerCall, anchor) as AngularFirestoreCollection<Object>
    }
  
  req.snapshotChanges().pipe(
    map(changes => changes.map(c => 
      ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      console.log(data)
      if(!data.length){
        this.disableNext = true;
        return;
      }
      
      this.reportsRM = data;
      this.disableNext = data.length < this.productsPerCall; //What if last batch is exactly productPerCall
      this.disablePrev = anchor ? false: true
      
    }, error => {
      this.disableNext = false;
  });
  }



  changeService(): void{
    this.reportsRM = []
    this.lastInResponses = []
    this.disableNext = false
    this.disablePrev = true
    this.nextPage(true)
  }

  filterMaterials(): void {
    
    this.filter = true;
    this.queryChange = this.query
    this.reportsRM = []
    this.disableNext = false
    this.disablePrev = true
    this.lastInResponses = []
    this.nextPage(true)
  }

  setActiveMaterial(reportRM: InvRawMaterial, index: number): void {
    this.currentRM = reportRM;
    this.currentIndex = index;
  }


  removeMaterialToProduct(materialIndex:any){
    this.productMaterials.splice(materialIndex, 1)
  }
}
