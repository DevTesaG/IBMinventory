"use strict";(self.webpackChunkInvFurniture=self.webpackChunkInvFurniture||[]).push([[72],{2072:(v,A,u)=>{u.r(A),u.d(A,{HistoryModule:()=>q});var e=u(6895),T=u(2827),t=u(4650),g=u(798),f=u(4006),o=u(5748);function l(s,_){if(1&s){const n=t.EpF();t.TgZ(0,"input",15),t.NdJ("ngModelChange",function(x){t.CHM(n);const Z=t.oxw();return t.KtG(Z.query=x)}),t.qZA()}if(2&s){const n=t.oxw();t.Q6J("ngModel",n.query)}}function d(s,_){if(1&s){const n=t.EpF();t.TgZ(0,"div",6)(1,"select",16),t.NdJ("ngModelChange",function(x){t.CHM(n);const Z=t.oxw();return t.KtG(Z.query=x)}),t.TgZ(2,"option",9),t._uU(3,"Todos"),t.qZA(),t.TgZ(4,"option",9),t._uU(5,"Materiales"),t.qZA(),t.TgZ(6,"option",9),t._uU(7,"Productos"),t.qZA(),t.TgZ(8,"option",9),t._uU(9,"Ordenes"),t.qZA()(),t.TgZ(10,"label",10),t._uU(11,"Inventario"),t.qZA()()}if(2&s){const n=t.oxw();t.xp6(1),t.Q6J("ngModel",n.query),t.xp6(1),t.Q6J("ngValue",void 0),t.xp6(2),t.Q6J("ngValue","InvRawMaterial"),t.xp6(2),t.Q6J("ngValue","invFinishedProduct"),t.xp6(2),t.Q6J("ngValue","Orders")}}function h(s,_){1&s&&(t.TgZ(0,"th",18),t._uU(1,"En espera Comprometido"),t.qZA())}function P(s,_){if(1&s&&(t.TgZ(0,"td"),t._uU(1),t.qZA()),2&s){const n=t.oxw().$implicit;t.xp6(1),t.Oqu(n.watingCommited)}}function i(s,_){if(1&s&&(t.TgZ(0,"tr")(1,"th",21),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.YNc(7,P,2,1,"td",22),t.TgZ(8,"td"),t._uU(9),t.qZA(),t.TgZ(10,"td"),t._uU(11),t.qZA()()),2&s){const n=_.$implicit,m=t.oxw(2);t.xp6(2),t.Oqu(n.name),t.xp6(2),t.hij("",n.available," "),t.xp6(2),t.Oqu(n.commited),t.xp6(1),t.Q6J("ngIf","/RMreport"==m.reportPath),t.xp6(2),t.hij(" ",n.wating,""),t.xp6(2),t.hij(" ",m.invTotal(n),"")}}function c(s,_){if(1&s&&(t.TgZ(0,"table",17)(1,"thead")(2,"tr")(3,"th",18),t._uU(4),t.qZA(),t.TgZ(5,"th",18),t._uU(6,"Disponible"),t.qZA(),t.TgZ(7,"th",18),t._uU(8,"Comprometido"),t.qZA(),t.YNc(9,h,2,0,"th",19),t.TgZ(10,"th",18),t._uU(11,"En espera"),t.qZA(),t.TgZ(12,"th",18),t._uU(13,"Total"),t.qZA()()(),t.TgZ(14,"tbody"),t.YNc(15,i,12,6,"tr",20),t.qZA()()),2&s){const n=t.oxw();t.xp6(4),t.Oqu("/FPreport"==n.reportPath?"Producto":"Material"),t.xp6(5),t.Q6J("ngIf","/RMreport"==n.reportPath),t.xp6(6),t.Q6J("ngForOf",n.reports)}}function r(s,_){if(1&s&&(t.TgZ(0,"tr")(1,"th",21),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA()()),2&s){const n=_.$implicit;t.xp6(2),t.Oqu(n.name),t.xp6(2),t.hij("",n.process," "),t.xp6(2),t.Oqu(n.user),t.xp6(2),t.Oqu(n.prior),t.xp6(2),t.Oqu(n.posterior)}}function a(s,_){if(1&s&&(t.TgZ(0,"table",17)(1,"thead")(2,"tr")(3,"th",18),t._uU(4,"Operacion"),t.qZA(),t.TgZ(5,"th",18),t._uU(6,"Proceso"),t.qZA(),t.TgZ(7,"th",18),t._uU(8,"Autoriza"),t.qZA(),t.TgZ(9,"th",18),t._uU(10,"Estado Previo"),t.qZA(),t.TgZ(11,"th",18),t._uU(12,"Estado Posterior"),t.qZA()()(),t.TgZ(13,"tbody"),t.YNc(14,r,11,5,"tr",20),t.qZA()()),2&s){const n=t.oxw();t.xp6(14),t.Q6J("ngForOf",n.reports)}}const y=[{path:"",component:(()=>{class s{constructor(n){this.audit=n,this.reportPath="/FPreport",this.reportPathChange="/FPreport",this.query=void 0,this.queryChange=void 0}ngOnInit(){}fetchedArray(n){this.reports=n}invTotal(n){return n.wating+n.commited+n.available+(n.watingCommited?n.watingCommited:0)}deleteAudit(){this.audit.deleteAll()}rootChanged(n){this.query=void 0,this.queryChange=void 0}filter(){this.queryChange=this.query}}return s.\u0275fac=function(n){return new(n||s)(t.Y36(g.C))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-history-list"]],decls:27,vars:12,consts:[[1,"container","mt-5","vh-100"],["role","search",1,"d-flex"],[1,"text-muted","text-nowrap","my-auto"],["class","form-control ms-2 me-2 float-end","type","search","name","query","placeholder","Buscar por Nombre","aria-label","Search",3,"ngModel","ngModelChange",4,"ngIf"],[1,"input-group","ms-2"],["class","form-floating w-50",4,"ngIf"],[1,"form-floating","w-50"],["name","Inventory","id","floatingSelect","aria-label","providers select",1,"form-select",3,"ngModel","ngModelChange","change"],["disabled","",3,"ngValue"],[3,"ngValue"],["for","floatingSelect"],["type","submit",1,"btn","btn-outline-success","float-end","ms-2",3,"click"],["type","button",1,"ms-2","btn","btn-outline-danger","float-end",3,"click"],[3,"path","mode","query","fetchedArray"],["class","table",4,"ngIf"],["type","search","name","query","placeholder","Buscar por Nombre","aria-label","Search",1,"form-control","ms-2","me-2","float-end",3,"ngModel","ngModelChange"],["name","Inventory","id","floatingSelect","aria-label","providers select",1,"form-select",3,"ngModel","ngModelChange"],[1,"table"],["scope","col"],["scope","col",4,"ngIf"],[4,"ngFor","ngForOf"],["scope","row"],[4,"ngIf"]],template:function(n,m){1&n&&(t.TgZ(0,"div",0)(1,"form",1)(2,"h4",2),t._uU(3,"Historial Inventario"),t.qZA(),t.YNc(4,l,1,1,"input",3),t.TgZ(5,"div",4),t.YNc(6,d,12,5,"div",5),t.TgZ(7,"div",6)(8,"select",7),t.NdJ("ngModelChange",function(Z){return m.reportPath=Z})("change",function(Z){return m.rootChanged(Z)}),t.TgZ(9,"option",8),t._uU(10,"Seleccione Inventario"),t.qZA(),t.TgZ(11,"option",9),t._uU(12,"Inventario Productos"),t.qZA(),t.TgZ(13,"option",9),t._uU(14,"Inventario Materiales"),t.qZA(),t.TgZ(15,"option",9),t._uU(16,"Movimientos"),t.qZA()(),t.TgZ(17,"label",10),t._uU(18,"Inventario"),t.qZA()()(),t.TgZ(19,"button",11),t.NdJ("click",function(){return m.filter()}),t._uU(20,"Buscar"),t.qZA(),t.TgZ(21,"button",12),t.NdJ("click",function(){return m.deleteAudit()}),t._uU(22,"Eliminar Audiciones"),t.qZA()(),t._UZ(23,"hr"),t.TgZ(24,"app-pagination",13),t.NdJ("fetchedArray",function(Z){return m.fetchedArray(Z)}),t.qZA(),t.YNc(25,c,16,3,"table",14),t.YNc(26,a,15,1,"table",14),t.qZA()),2&n&&(t.xp6(4),t.Q6J("ngIf","/audit"!=m.reportPath),t.xp6(2),t.Q6J("ngIf","/audit"==m.reportPath),t.xp6(2),t.Q6J("ngModel",m.reportPath),t.xp6(1),t.Q6J("ngValue",void 0),t.xp6(2),t.Q6J("ngValue","/FPreport"),t.xp6(2),t.Q6J("ngValue","/RMreport"),t.xp6(2),t.Q6J("ngValue","/audit"),t.xp6(9),t.Q6J("path",m.reportPath)("mode",!0)("query",m.queryChange),t.xp6(1),t.Q6J("ngIf","/audit"!=m.reportPath),t.xp6(1),t.Q6J("ngIf","/audit"==m.reportPath))},dependencies:[e.sg,e.O5,f._Y,f.YN,f.Kr,f.Fj,f.EJ,f.JJ,f.JL,f.On,f.F,o.Q]}),s})()}];let C=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[T.Bz.forChild(y),T.Bz]}),s})();var b=u(4466);let q=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[e.ez,C,f.u5,b.m]}),s})()},798:(v,A,u)=>{u.d(A,{C:()=>d});var e=u(8179),T=u(4004),t=u(7886),g=u(1402),f=u(5577),o=u(4650),l=u(33);let d=(()=>{class h{constructor(i){this.db=i,this.dbPath="/audit",this.objectsRef=i.collection(this.dbPath)}getNextBatch(i,c){return this.db.collection(this.dbPath,c?r=>r.orderBy("timestamp","desc").startAfter(c.timestamp).limit(i):r=>r.orderBy("timestamp","desc").limit(i))}create(i,c,r,a,p,y){var C={name:i,process:c,posterior:a,timestamp:e.EK.fromDate(new Date),user:r};return p&&(C.prior=p),y&&(C.itemId=y),this.objectsRef.add({...C})}update(i,c){return this.objectsRef.doc(i).update(c)}delete(i){return this.objectsRef.doc(i).delete()}deleteAll(){return this.objectsRef.get().pipe((0,T.U)(i=>i.docs),(0,t.u)(),(0,g.j)(500),(0,f.z)(i=>{var c=this.db.firestore.batch();return i.map(r=>c.delete(r.ref)),c.commit()}))}filterByDateBatch(i,c,r,a,p){return console.log(r),this.db.collection(this.dbPath,y=>y.where("timestamp",">=",i).where("timestamp","<=",c).where("name","==",r).orderBy("timestamp","desc").limit(a))}filterByNameBatch(i,c,r){return this.db.collection(this.dbPath,r?a=>a.where("name",">=",i).where("name","<=",i+"\uf8ff").orderBy("name","desc").startAfter(r.name).limit(c):a=>a.where("name",">=",i).where("name","<=",i+"\uf8ff").orderBy("name","desc").limit(c))}filterByCodeBatch(i,c,r){return this.db.collection(this.dbPath,r?a=>a.where("code",">=",i).where("code","<=",i+"\uf8ff").orderBy("code","desc").startAfter(r.code).limit(c):a=>a.where("code",">=",i).where("code","<=",i+"\uf8ff").orderBy("code","desc").limit(c))}}return h.\u0275fac=function(i){return new(i||h)(o.LFG(l.ST))},h.\u0275prov=o.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"}),h})()},6535:(v,A,u)=>{u.d(A,{U:()=>t});var e=u(4650),T=u(33);let t=(()=>{class g{constructor(o,l){this.db=o,this.path=l,this.objectRef=o.collection(this.path)}pathSetter(o){this.path=o,this.objectRef=this.db.collection(this.path)}pathGetter(){return this.path}getNextBatch(o,l){return this.db.collection(this.path,l?d=>d.orderBy("timestamp","desc").startAfter(l.timestamp).limit(o):d=>d.orderBy("timestamp","desc").limit(o))}getAll(){return this.objectRef}getByKey(o,l){return this.db.collection(this.path,d=>d.where(o,"==",l))}create(o,l){return l?this.objectRef.doc(l).set(o):this.objectRef.add({...o})}update(o,l){return this.objectRef.doc(o).update(l)}delete(o){return this.objectRef.doc(o).delete()}filterByNameBatch(o,l,d){return this.db.collection(this.path,d?h=>h.where("name",">=",o).where("name","<=",o+"\uf8ff").orderBy("name","desc").startAfter(d.name).limit(l):h=>h.where("name",">=",o).where("name","<=",o+"\uf8ff").orderBy("name","desc").limit(l))}filterUrgent(o,l,d){return this.db.collection(this.path,d?h=>h.where("orderDeadline","<=",o).orderBy("orderDeadline","asc").startAfter(d.name).limit(l):h=>h.where("orderDeadline","<=",o).orderBy("orderDeadline","asc").limit(l))}filterByKeyBatch(o,l,d,h,P){return"orderDeadline"==o?this.filterUrgent(l,d,h):this.db.collection(this.path,h?P?i=>i.where(o,"==",l).orderBy("timestamp","desc").startAfter(h.timestamp).limit(d):i=>i.where(o,">=",l).where(o,"<=",l+"\uf8ff").orderBy(o,"desc").startAfter(h[o]).limit(d):P?i=>i.where(o,"==",l).orderBy("timestamp","desc").limit(d):i=>i.where(o,">=",l).where(o,"<=",l+"\uf8ff").orderBy(o,"desc").limit(d))}}return g.\u0275fac=function(o){return new(o||g)(e.LFG(T.ST),e.LFG("path"))},g.\u0275prov=e.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})()},5748:(v,A,u)=>{u.d(A,{Q:()=>P});var e=u(4650),T=u(4004),t=u(6535),g=u(6895);function f(i,c){if(1&i&&(e.TgZ(0,"div",15),e._uU(1),e.qZA()),2&i){const r=e.oxw().$implicit,a=e.oxw().$implicit,p=e.oxw(2);e.xp6(1),e.hij(" ",a[r].toDate().toLocaleDateString("es-MX",p.dateOptions)," ")}}function o(i,c){if(1&i&&(e.TgZ(0,"div"),e._uU(1),e.qZA()),2&i){const r=e.oxw().$implicit,a=e.oxw().$implicit;e.xp6(1),e.hij(" ",a[r]," ")}}function l(i,c){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,f,2,1,"div",13),e.YNc(2,o,2,1,"div",14),e.qZA()),2&i){const r=c.$implicit;e.xp6(1),e.Q6J("ngIf","orderDeadline"==r),e.xp6(1),e.Q6J("ngIf","orderDeadline"!=r)}}function d(i,c){if(1&i){const r=e.EpF();e.TgZ(0,"li",10),e.NdJ("click",function(){const p=e.CHM(r),y=p.$implicit,C=p.index,b=e.oxw(2);return e.KtG(b.setActiveProduct(y,C))}),e.TgZ(1,"span",11),e.YNc(2,l,3,2,"div",12),e.qZA()()}if(2&i){const r=c.index,a=e.oxw(2);e.ekj("active",r==a.currentIndex),e.xp6(2),e.Q6J("ngForOf",a.showParams)}}function h(i,c){if(1&i&&(e.TgZ(0,"ul",8),e.YNc(1,d,3,3,"li",9),e.qZA()),2&i){const r=e.oxw();e.xp6(1),e.Q6J("ngForOf",r.elementArray)}}let P=(()=>{class i{constructor(r){this.fos=r,this.selectedElement=new e.vpe,this.fetchedArray=new e.vpe,this.showParams=["name"],this.mode=!1,this.key="name",this.dateOptions={weekday:"long",year:"numeric",month:"long",day:"numeric"},this.currentIndex=-1,this.isFetched=!1,this.firstCall=!0,this.disableNext=!1,this.disablePrev=!0,this.updateProducts=!1,this.elementArray=[],this.lastInResponses=[],this.cached=[],this.queryChange=void 0,this.filterKey="name",this.exact=!1,this.elementPerCall=2}ngOnInit(){this.path||(this.path="/products"),this.fos.pathSetter(this.path),this.nextPage(!0),this.filterKey=this.key,this.firstCall=!1}setActiveProduct(r,a){this.currentIndex=a,this.selectedElement.emit({element:r,index:a})}nextPage(r){var a;if(r){if(this.disableNext)return;a=this.elementArray.at(-1),this.lastInResponses.push(a)}else{if(this.disablePrev)return;this.lastInResponses?.pop(),a=this.lastInResponses?.at(-1)}this.req=this.queryChange?this.fos.filterByKeyBatch(this.key,this.queryChange,this.elementPerCall,a,this.exact):this.fos.getNextBatch(this.elementPerCall,a),this.req.get().pipe((0,T.U)(p=>p.docs.map(y=>({id:y.id,...y.data()})))).subscribe({next:p=>{if(!p.length)return this.disableNext=!0,void this.lastInResponses?.pop();this.elementArray=p,this.disableNext=p.length<this.elementPerCall,this.disablePrev=!a,this.isFetched=!0,this.mode&&this.fetchedArray.emit(this.elementArray)},error:p=>alert(p),complete:()=>console.log("SI completo")})}resetPagination(){this.disableNext=!1,this.disablePrev=!0,this.currentIndex=-1,this.currentElement=void 0,this.elementArray=[],this.lastInResponses=[]}ngOnChanges(r){this.firstCall||(this.isFetched=!1,r.path&&this.fos.pathSetter(r.path.currentValue),r.key&&console.log("Key Changed"),r.query&&(r.query.currentValue instanceof Object?(this.queryChange=r.query.currentValue.value,this.key=r.query.currentValue.key?r.query.currentValue.key:this.filterKey,this.exact=!!r.query.currentValue.exact):(this.queryChange=r.query.currentValue,this.key=this.filterKey,this.exact=!1),console.log(this.key,this.queryChange)),this.filterProducts())}filterProducts(){this.resetPagination(),this.nextPage(!0)}}return i.\u0275fac=function(r){return new(r||i)(e.Y36(t.U))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-pagination"]],inputs:{query:"query",path:"path",showParams:"showParams",mode:"mode",key:"key"},outputs:{selectedElement:"selectedElement",fetchedArray:"fetchedArray"},features:[e._Bn([t.U,{provide:"path",useValue:"/RMreport"}]),e.TTD],decls:14,vars:1,consts:[["aria-label","Page navigation",1,"my-3"],[1,"pagination"],[1,"page-item"],["aria-label","Previous",1,"page-link",3,"click"],["aria-hidden","true"],[1,"page-link","text-black"],["aria-label","Next",1,"page-link",3,"click"],["class","list-group mt-3 mb-3",4,"ngIf"],[1,"list-group","mt-3","mb-3"],["class","list-group-item",3,"active","click",4,"ngFor","ngForOf"],[1,"list-group-item",3,"click"],[1,"d-flex"],[4,"ngFor","ngForOf"],["class","ms-2",4,"ngIf"],[4,"ngIf"],[1,"ms-2"]],template:function(r,a){1&r&&(e.TgZ(0,"nav",0)(1,"ul",1)(2,"li",2)(3,"button",3),e.NdJ("click",function(){return a.nextPage(!1)}),e.TgZ(4,"span",4),e._uU(5,"\xab"),e.qZA()()(),e.TgZ(6,"li",2)(7,"span",5),e._uU(8," Anterior/Siguiente Registro"),e.qZA()(),e.TgZ(9,"li",2)(10,"button",6),e.NdJ("click",function(){return a.nextPage(!0)}),e.TgZ(11,"span",4),e._uU(12,"\xbb"),e.qZA()()()()(),e.YNc(13,h,2,1,"ul",7)),2&r&&(e.xp6(13),e.Q6J("ngIf",!a.mode&&a.isFetched))},dependencies:[g.sg,g.O5]}),i})()}}]);