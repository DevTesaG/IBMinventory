"use strict";(self.webpackChunkInvFurniture=self.webpackChunkInvFurniture||[]).push([[25],{1025:(he,b,d)=>{d.r(b),d.d(b,{OrdersModule:()=>pe});var m=d(6895),h=d(2827),x=d(1350),p=d(8996),f=d(5577),v=d(5698),O=d(3900),_=d(6451),C=d(8505),u=d(4985),e=d(4650),A=d(8132),Z=d(9898),w=d(490),k=d(3416),S=d(2121),q=d(7915),l=d(4006),y=d(5748);function J(i,s){1&i&&(e.TgZ(0,"h6"),e._uU(1," El proceso puede ser tardado por favor espere."),e.qZA())}function U(i,s){1&i&&(e.TgZ(0,"div"),e._UZ(1,"br"),e.TgZ(2,"p"),e._uU(3,"Seleccione una orden..."),e.qZA()())}function E(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"li",32)(1,"div",33)(2,"div",34),e._uU(3),e.qZA(),e.TgZ(4,"div",35)(5,"input",36),e.NdJ("ngModelChange",function(n){const a=e.CHM(t).$implicit;return e.KtG(a.quantity=n)}),e.qZA(),e.TgZ(6,"span",37),e._uU(7,"U"),e.qZA()()()()}if(2&i){const t=s.$implicit;e.xp6(3),e.hij(" ",t.name," "),e.xp6(2),e.Q6J("ngModel",t.quantity)}}const I=function(){return["btn-outline-success"]},B=function(){return["btn-outline-primary"]};function L(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"div",26)(1,"h4"),e._uU(2,"Orden"),e.qZA(),e.TgZ(3,"app-form",27),e.NdJ("formModel",function(n){e.CHM(t);const o=e.oxw();return e.KtG(o.submit(n))}),e.qZA(),e.TgZ(4,"p"),e._uU(5,"productos de la Orden: "),e.qZA(),e.TgZ(6,"ul",28),e.YNc(7,E,8,2,"li",29),e.qZA(),e.TgZ(8,"app-warn-modal",30),e.NdJ("continue",function(n){e.CHM(t);const o=e.oxw();return e.KtG(o.setOrderReady(n))}),e.qZA(),e.TgZ(9,"app-warn-modal",31),e.NdJ("continue",function(n){e.CHM(t);const o=e.oxw();return e.KtG(o.completeOrder(n))}),e.qZA()()}if(2&i){const t=e.oxw();e.xp6(3),e.Q6J("mode",!0)("formObj",t.formObj)("placeHolder",t.currentOrder),e.xp6(4),e.Q6J("ngForOf",t.currentOrder.orderProducts),e.xp6(1),e.Q6J("classlist",e.DdM(6,I)),e.xp6(1),e.Q6J("classlist",e.DdM(7,B))}}const R=function(){return["btn-outline-danger","float-end"]};let Q=(()=>{class i{constructor(t,r,n,o){this.OrderService=t,this.invFpService=r,this.invRmService=n,this.fo=o,this.title="",this.currentIndex=-1,this.q="",this.queryChange=void 0,this.codeFilter=!1,this.download=!1,this.formObj=[[new u.O("Numero de Orden de Pedido","name","text"),new u.O("Estado","state","text")],[new u.O("Nombre del Cliente","clientName","text")],[new u.O("Fecha de Embarque","shipDate","date")],[new u.O("Dias de Produccion","productionDays","number"),new u.O("Pedido de Insumos","orderInput","number")],[new u.O("Pedido Materia Prima","rmOrderDeadline","date"),new u.O("Limite inicio de Produccion","startProductionDeadline","date")],[new u.O("Notas","notes","text")]]}ngOnInit(){}submit(t){}getSelectedElement(t){this.currentOrder=t.element,this.currentIndex=t.index}filter(){this.queryChange={value:this.orderStateFilter,exact:!0},this.currentOrder=void 0}refreshList(){this.orderStateFilter=void 0,this.currentOrder=void 0}ngOnChanges(t){t.orderStateFilter&&(this.currentOrder=void 0)}editProducts(){}downloadFinishedOrders(t){!t||(this.download=!0,this.fo.deleteAll().subscribe({complete:()=>{this.download=!1,alert("Ordenes Terminadas Eliminadas correctamente")},error:()=>{this.download=!1,alert("Error inesperado, porfavor intente de nuevo")}}))}setOrderReady(t){if(t){if("ESPERANDO MATERIAL"==this.currentOrder?.state)return void alert('La orden NO puede establecerse como "LISTA" ya que est\xe1 "ESPERANDO MATERIAL".');(0,x.z)((0,p.D)(this.currentOrder?.orderProducts??[]).pipe((0,f.z)(r=>(0,p.D)(this.invFpService.getStock(r.invId)).pipe((0,v.q)(1),(0,O.w)(n=>this.invFpService.update(r.invId,{wating:Math.max(0,+(n.wating??0)-r.quantity),commited:Math.max(0,+(n.commited??0)+r.quantity)}))))),this.OrderService.update(this.currentOrder?.id,{state:"TERMINADA"})).subscribe({error:r=>alert(r),complete:()=>alert("La orden fue establecida como terminada satisfactoriamente")})}}completeOrder(t){if(t){if("EN PRODUCCION"==this.currentOrder?.state)return void alert('La orden NO puede establecerse como "TERMINADA" ya que est\xe1 "EN PRODUCCION".');var r=(0,p.D)(this.currentOrder?.orderProducts??[]).pipe((0,f.z)(o=>(0,p.D)(this.invFpService.getStock(o.invId)).pipe((0,v.q)(1),(0,O.w)(a=>this.invFpService.update(o.invId,{commited:Math.max(0,+(a.commited??0)-o.quantity)}))))),n=(0,p.D)(this.currentOrder?.orderMaterials??[]).pipe((0,f.z)(o=>this.invRmService.getStock(o.matId).pipe((0,v.q)(1),(0,O.w)(a=>this.invRmService.update(a.id,{commited:Math.max(0,+(a.commited??0)-+o.quantity)})))));(0,x.z)((0,_.T)(r,n),(0,_.T)(this.OrderService.delete(this.currentOrder?.id),this.fo.create({state:"ENTREGADA",...this.currentOrder}))).pipe((0,C.b)({complete:()=>alert("Orden Completada")})).subscribe(),this.refreshList()}}readableDate(t){var r=new Date(t);return r.getDate()+"/"+r.getMonth()+"/"+r.getFullYear()}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(A.p),e.Y36(Z.L),e.Y36(w.y),e.Y36(k.L))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-orders-list"]],features:[e.TTD],decls:37,vars:10,consts:[[1,"container","mt-5","vh-100"],["role","search",1,"d-flex","form-inline"],[1,"text-muted","text-nowrap","my-auto"],[1,"form-floating","flex-fill","ms-5","me-2"],["name","state","id","floatingSelect","aria-label","providers select",1,"form-select",3,"ngModel","ngModelChange"],[3,"ngValue"],["ngValue","ESPERANDO MATERIAL"],["ngValue","EN PRODUCCION"],["ngValue","TERMINADA"],["ngValue","ENTREGADA"],["for","floatingSelect"],["type","submit",1,"btn","btn-outline-success","float-end",3,"click"],["type","button","btnMessage","Descargar Ordenes Terminadas","modalMessage","Esta seguro de que desea descargar todas las ordenes terminadas?",3,"classlist","continue"],[4,"ngIf"],[1,"position-fixed","bottom-0","end-0",2,"margin","6rem","z-index","1070"],["routerLink","add",1,"btn","btn-success","btn-lg","rounded-pill"],["fill","#ffffff","version","1.1","id","Capa_1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","width","4vh","height","4vh","viewBox","0 0 47 47",0,"xml","space","preserve","stroke","#ffffff"],["id","SVGRepo_bgCarrier","stroke-width","0"],["id","SVGRepo_tracerCarrier","stroke-linecap","round","stroke-linejoin","round"],["id","SVGRepo_iconCarrier"],["d","M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"],[1,"list","row","shadow-sm"],[1,"col-md-6"],[3,"path","key","query","selectedElement"],[1,"col-lg-6"],["class","edit-form",4,"ngIf"],[1,"edit-form"],["btnMes","Crear Orden","modalMessage","\xbfDesea continuar con la creacion de la Orden?",3,"mode","formObj","placeHolder","formModel"],[1,"list-group","mt-1","mb-3"],["class","list-group-item",4,"ngFor","ngForOf"],["type","submit","btnMessage","Orden Lista","modalMessage","\xbfSeguro que desea marcar la orden como lista?",3,"classlist","continue"],["type","submit","btnMessage","Completar Orden","modalMessage","\xbfSeguro que desea completar la orden?",3,"classlist","continue"],[1,"list-group-item"],[1,"d-flex","flex-row","mx-auto"],[1,"my-auto","text-nowrap"],[1,"input-group","h-25","my-auto","ms-2"],["type","number","placeholder","Unidades","readonly","","name","UP","readonly","","aria-label","quantity",1,"form-control","input-sm",3,"ngModel","ngModelChange"],[1,"input-group-text"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"form",1)(2,"h4",2),e._uU(3,"Lista de Ordenes"),e.qZA(),e.TgZ(4,"div",3)(5,"select",4),e.NdJ("ngModelChange",function(o){return r.orderStateFilter=o}),e.TgZ(6,"option",5),e._uU(7,"TODAS"),e.qZA(),e.TgZ(8,"option",6),e._uU(9,"ESPERANDO MATERIAL"),e.qZA(),e.TgZ(10,"option",7),e._uU(11,"EN PRODUCCION"),e.qZA(),e.TgZ(12,"option",8),e._uU(13,"TERMINADA"),e.qZA(),e.TgZ(14,"option",9),e._uU(15,"ENTREGADA"),e.qZA()(),e.TgZ(16,"label",10),e._uU(17,"Buscar por Estado"),e.qZA()(),e.TgZ(18,"button",11),e.NdJ("click",function(){return r.filter()}),e._uU(19,"Buscar"),e.qZA(),e.TgZ(20,"app-warn-modal",12),e.NdJ("continue",function(o){return r.downloadFinishedOrders(o)}),e.qZA()(),e._UZ(21,"hr"),e.YNc(22,J,2,0,"h6",13),e.TgZ(23,"div",14)(24,"button",15),e.O4$(),e.TgZ(25,"svg",16),e._UZ(26,"g",17)(27,"g",18),e.TgZ(28,"g",19)(29,"g"),e._UZ(30,"path",20),e.qZA()()()()(),e.kcU(),e.TgZ(31,"div",21)(32,"div",22)(33,"app-pagination",23),e.NdJ("selectedElement",function(o){return r.getSelectedElement(o)}),e.qZA()(),e.TgZ(34,"div",24),e.YNc(35,U,4,0,"div",13),e.YNc(36,L,10,8,"div",25),e.qZA()()()),2&t&&(e.xp6(5),e.Q6J("ngModel",r.orderStateFilter),e.xp6(1),e.Q6J("ngValue",void 0),e.xp6(14),e.Q6J("classlist",e.DdM(9,R)),e.xp6(2),e.Q6J("ngIf",r.download),e.xp6(11),e.Q6J("path","/orders")("key","state")("query",r.queryChange),e.xp6(2),e.Q6J("ngIf",!r.currentOrder),e.xp6(1),e.Q6J("ngIf",r.currentOrder))},dependencies:[m.sg,m.O5,h.rH,S.u,q.U,l._Y,l.YN,l.Kr,l.Fj,l.wV,l.EJ,l.JJ,l.JL,l.On,l.F,y.Q]}),i})();var M=d(5861);class Y{}var j=d(3602);class G{}var N=d(8179),$=d(9646),T=d(4128),V=d(4004),H=d(5561),z=d(798),D=d(3651);let P=(()=>{class i{constructor(t,r,n,o,a,c,g){this.invFP=t,this.invrmService=r,this.orderService=n,this.router=o,this.shopService=a,this.auditService=c,this.auth=g,this.reqMaterials=[],this.materials=[],this.orderProducts=[],this.order=new G}updateProviderMaterialStock(){return this.materials?(0,T.D)(Array.from(Object.entries(this.materials)).map(t=>this.invrmService.getStock(t[0]).pipe((0,V.U)(r=>{if(null==r.available||null==r.commited||null==r.wating||null==r.watingCommited)return{};var n=Math.max(0,t[1].quantity-r.available),o=n>0,a={commited:+r.commited+Math.min(r.available,t[1].quantity),available:Math.max(0,+r.available-t[1].quantity),watingCommited:+r.watingCommited+Math.max(0,t[1].quantity-r.available)};return{matId:t[0],name:t[1].name,quantity:t[1].quantity,id:r.id,oldStock:r,newStock:a,requestMaterial:o,requested:n}})))):(0,$.of)([])}initMaterialOrder(){this.reqMaterials.forEach(t=>{var r=t.requested<t.minBatch?t.minBatch-t.requested:0;t.newStock.wating+=+r,t.amount=r})}assignProvider(t,r){this.reqMaterials[t].minBatch=r.minBatch,this.reqMaterials[t].deliveryTime=r.deliveryTime,this.reqMaterials[t].price=r.price,alert("Provedor asignado satisfactoriamente")}getOrderWaitMaxTime(){return Math.max(...this.reqMaterials.map(t=>t.deliveryTime))}getTotalPrice(){console.log("AAAA");var t=this.orderProducts.reduce((r,n)=>("mxn"==n.currency?r.mxn=r.mxn?r.mxn+n.price*n.quantity:n.price*n.quantity:r.usd=r.usd?r.usd+n.price*n.quantity:n.price*n.quantity,r),[]);this.order.total=t}getTotalMaterials(){this.orderProducts?(this.orderProducts.forEach(t=>t.materials.forEach(r=>r.quantity*=t.quantity)),this.materials=this.orderProducts.flatMap(t=>t.materials).reduce((t,r)=>(t[r.id]=t[r.id]?{name:r.name,quantity:t[r.id].quantity+r.quantity}:{name:r.name,quantity:r.quantity},t),{})):this.materials=[]}useFP(t,r){var n=this;return(0,M.Z)(function*(){if(n.orderProducts[r].stock)n.orderProducts[r].available=n.orderProducts[r].available?void 0:n.orderProducts[r].stock.available;else{var o=(yield n.invFP.getStock(t))||0;n.orderProducts[r].available=o.available,n.orderProducts[r].stock=o}})()}updateOrderProductStock(){var t=this;this.orderProducts.forEach(function(){var r=(0,M.Z)(function*(n){var o;n.useFP?o={available:Math.max(0,n.stock.available-n.quantity),commited:+n.stock.commited+Math.min(n.quantity,n.stock.available),wating:+n.stock.wating+Math.max(0,n.quantity-n.stock.available)}:(n.stock||(n.stock=(yield t.invFP.getStock(n.id))||0),o={wating:+n.stock.wating+ +n.quantity}),n.newStock=o});return function(n){return r.apply(this,arguments)}}())}updateProductStock(){return(0,p.D)(this.orderProducts).pipe((0,f.z)(t=>(0,T.D)([this.invFP.update(t.stock.id,t.newStock),this.makeProdStockReport(t.id,t.name,t.stock,t.newStock)])))}updateMaterialStock(t,r){console.log(t);var n=(0,p.D)(this.reqMaterials).pipe((0,f.z)(a=>(0,T.D)([this.shopService.create(a.matId,a.name,a.requested+a.amount,a.amount,N.EK.fromDate(new Date(this.order?.rmOrderDeadline)),a.id,(a.requested+a.amount)*a.price,t),this.invrmService.update(a.id,a.newStock),this.makeMatStockReport(a.matId,a.name,a.oldStock,a.newStock)]))),o=(0,p.D)(this.materials).pipe((0,f.z)(a=>(0,T.D)([this.invrmService.update(a.id,a.newStock),this.makeMatStockReport(a.matId,a.name,a.oldStock,a.newStock)])));return(0,_.T)(n,o)}makeProdStockReport(t,r,n,o){return this.auditService.create(Y.name,`Actualizacion Stock de Producto: ${r}`,this.auth.username,JSON.stringify(o),JSON.stringify(n),t)}makeMatStockReport(t,r,n,o){return this.auditService.create(j.N.name,`Actualizacion Stock de Material: ${r}`,this.auth.username,JSON.stringify(o),JSON.stringify(n),t)}editProducts(){var t=this.orderProducts.map(n=>({id:n.id,invId:n.invId,name:n.name,quantity:n.quantity}));return this.orderService.create({orderProducts:t,state:0==this.reqMaterials.length?"EN PRODUCCION":"ESPERANDO MATERIAL",orderMaterials:this.materials.concat(this.reqMaterials).map(n=>({matId:n.matId,quantity:n.quantity})),timestamp:N.EK.fromDate(new Date),...this.order}).pipe((0,v.q)(1),(0,O.w)(n=>(0,_.T)(this.updateMaterialStock(n.id,n.name??""),this.updateProductStock())),(0,C.b)({error:n=>{console.log(n),alert("Ha ocurrido un error intente de nuevo.")},complete:()=>{alert("Orden Creada correctamente"),console.log("ENDED")}}))}}return i.\u0275fac=function(t){return new(t||i)(e.LFG(Z.L),e.LFG(w.y),e.LFG(A.p),e.LFG(h.F0),e.LFG(H.l),e.LFG(z.C),e.LFG(D.e))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();function K(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"li",13)(1,"div",14)(2,"span",15),e._uU(3),e.qZA(),e.TgZ(4,"div",16)(5,"input",17),e.NdJ("ngModelChange",function(n){const a=e.CHM(t).$implicit;return e.KtG(a.quantity=n)}),e.qZA(),e.TgZ(6,"span",18),e._uU(7,"U"),e.qZA(),e.TgZ(8,"input",19),e.NdJ("ngModelChange",function(n){const a=e.CHM(t).$implicit;return e.KtG(a.available=n)}),e.qZA(),e.TgZ(9,"span",18),e._uU(10,"U"),e.qZA(),e.TgZ(11,"div",20)(12,"label",21),e._uU(13," Usar PT"),e.qZA(),e.TgZ(14,"input",22),e.NdJ("change",function(){const n=e.CHM(t),o=n.$implicit,a=n.index,c=e.oxw();return e.KtG(c.orderBuisness.useFP(o.invId,a))}),e.qZA()()(),e.TgZ(15,"button",23),e.NdJ("click",function(){const o=e.CHM(t).index,a=e.oxw();return e.KtG(a.removeProductFromOrder(o))}),e.qZA()()()}if(2&i){const t=s.$implicit;e.xp6(3),e.hij(" ",t.name," "),e.xp6(2),e.Q6J("ngModel",t.quantity),e.xp6(3),e.Q6J("ngModel",t.available),e.xp6(6),e.Q6J("ngModel",t.useFP)}}let W=(()=>{class i{constructor(t,r,n){this.router=t,this.invFP=r,this.orderBuisness=n,this.orderProducts=[],this.materials=[],this.q="",this.query="",this.codeFilter=!1,this.continueDisabled=!0}ngOnInit(){}filter(){this.q=this.query}createOrder(){0==this.orderBuisness.orderProducts.filter(t=>!t.quantity||t.quantity<0||!Number.isInteger(t.quantity)).length?(console.log(this.orderBuisness.orderProducts),this.orderBuisness.getTotalMaterials(),this.orderBuisness.updateOrderProductStock(),this.orderBuisness.getTotalPrice(),this.orderBuisness.orderProducts.forEach(t=>{delete t.materials,delete t.available}),this.router.navigate(["orders/add/providers"])):alert("Hay productos sin cantidad asignada o menor a 0, porfavor rectifique.")}useFP(t,r){var n=this;return(0,M.Z)(function*(){if(n.orderProducts[r].stock)n.orderProducts[r].available=n.orderProducts[r].available?void 0:n.orderProducts[r].stock.available;else{var o=(yield n.invFP.getStock(t))||0;n.orderProducts[r].available=o.available,n.orderProducts[r].stock=o}})()}addProductToOrder(t){this.continueDisabled=!1,this.orderBuisness.orderProducts.find(n=>n.id==t.id)||this.orderBuisness.orderProducts.push({name:t.name,id:t.id,invId:t.invId,leadTime:t.leadTime,materials:t.materials,price:t.price,currency:t.currency})}validate(){}removeProductFromOrder(t){this.orderBuisness.orderProducts.splice(t,1),this.continueDisabled=!!this.orderBuisness.orderProducts.length}getSelectedElement(t){this.continueDisabled=!!this.orderBuisness.orderProducts.length,this.addProductToOrder(t.element)}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(h.F0),e.Y36(Z.L),e.Y36(P))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-order-products"]],decls:21,vars:4,consts:[[1,"container","mt-5","vh-100"],["role","search",1,"d-flex"],[1,"text-muted","text-nowrap","my-auto"],["type","search","name","query","placeholder","Buscar por Nombre","aria-label","Search",1,"form-control","ms-2","me-2","float-end",3,"ngModel","ngModelChange"],["type","submit",1,"btn","btn-outline-success","float-end",3,"click"],[1,"list","row","shadow-sm"],[1,"col-md-6"],[1,"text-muted","mt-1"],[3,"path","query","selectedElement"],[1,"edit-form"],[1,"mt-4","rounded-pill","btn","btn-outline-success",3,"click"],[1,"list-group","mt-3","mb-3"],["class","list-group-item",4,"ngFor","ngForOf"],[1,"list-group-item"],[1,"d-flex","flex-row","justify-content-between"],[1,"my-auto"],[1,"input-group"],["type","number","placeholder","Unidades","name","UP","min","1","max","30","step","1","oninput","validity.valid||(value='') || Number.isInteger(value);","aria-label","quantity",1,"form-control","input-sm",3,"ngModel","ngModelChange"],[1,"input-group-text"],["type","number","readonly","","placeholder","Disponible en PT","name","stock","aria-label","stock",1,"form-control","input-sm",3,"ngModel","ngModelChange"],[1,"form-check","input-group-append","mx-2","my-auto"],["for","flexCheckDefault",1,"form-check-label"],["type","checkbox","id","flexCheckDefault","name","codeFilter",1,"form-check-input",3,"ngModel","change"],[1,"btn-close","my-auto","btn-sm","rounded-pill","float-end",3,"click"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"form",1)(2,"h3",2),e._uU(3,"Registrar orden"),e.qZA(),e.TgZ(4,"input",3),e.NdJ("ngModelChange",function(o){return r.query=o}),e.qZA(),e.TgZ(5,"button",4),e.NdJ("click",function(){return r.filter()}),e._uU(6,"Buscar"),e.qZA()(),e._UZ(7,"hr"),e.TgZ(8,"div",5)(9,"div",6)(10,"h5",7),e._uU(11,"Productos disponibles:"),e.qZA(),e.TgZ(12,"app-pagination",8),e.NdJ("selectedElement",function(o){return r.getSelectedElement(o)}),e.qZA()(),e.TgZ(13,"div",6)(14,"div",9)(15,"button",10),e.NdJ("click",function(){return r.createOrder()}),e._uU(16,"Continuar"),e.qZA(),e.TgZ(17,"p"),e._uU(18,"productos de la Orden: "),e.qZA(),e.TgZ(19,"ul",11),e.YNc(20,K,16,4,"li",12),e.qZA()()()()()),2&t&&(e.xp6(4),e.Q6J("ngModel",r.query),e.xp6(8),e.Q6J("path","/products")("query",r.q),e.xp6(8),e.Q6J("ngForOf",r.orderBuisness.orderProducts))},dependencies:[m.sg,l._Y,l.Fj,l.wV,l.Wl,l.JJ,l.JL,l.qQ,l.Fd,l.On,l.F,y.Q]}),i})();var X=d(1135),F=d(727);function ee(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"li",15)(1,"div",16)(2,"span",17),e._uU(3),e.qZA(),e.TgZ(4,"div",18)(5,"input",19),e.NdJ("ngModelChange",function(n){const a=e.CHM(t).$implicit;return e.KtG(a.quantity=n)}),e.qZA(),e.TgZ(6,"span",20),e._uU(7,"U"),e.qZA(),e.TgZ(8,"input",21),e.NdJ("ngModelChange",function(n){const a=e.CHM(t).$implicit;return e.KtG(a.stock=n)}),e.qZA(),e.TgZ(9,"span",20),e._uU(10,"U"),e.qZA(),e.TgZ(11,"div",22)(12,"label",23),e._uU(13," Usar PT"),e.qZA(),e._UZ(14,"input",24),e.qZA()()()()}if(2&i){const t=s.$implicit;e.xp6(3),e.hij(" ",t.name," "),e.xp6(2),e.Q6J("ngModel",t.quantity),e.xp6(3),e.Q6J("ngModel",t.stock),e.xp6(6),e.Q6J("ngModel",t.useFP)}}function te(i,s){1&i&&(e.TgZ(0,"div"),e._UZ(1,"br"),e.TgZ(2,"p"),e._uU(3,"No se selecciono ningun producto..."),e.qZA()())}let re=(()=>{class i{constructor(t,r,n){this.router=t,this.auth=r,this.orderBusiness=n,this.submitted=!1,this.q="",this.queryChange=void 0,this.orderProducts=[],this.reqMaterials=[],this.materials=[],this.clientName="",this.clientName$=new X.X(this.clientName),this.create$=new F.w0,this.getClientName=()=>this.clientName,this.getProductionDays=()=>Math.ceil(this.orderBusiness.orderProducts.map(o=>o.leadTime*o.quantity).reduce((o,a)=>o+a,0)),this.getOrderInput=()=>this.order.orderWaitMaxTime,this.getRmOrderDeadline=(o,a,c)=>{if(!(o&&a&&c))return;const g=new Date(o);return g.setDate(new Date(o).getDate()-c-a),this.formatDateString(g.toLocaleDateString())},this.getStartProductionDeadline=(o,a,c)=>{if(!(o&&a&&c))return;const g=new Date(o);return g.setDate(new Date(o).getDate()-a),this.formatDateString(g.toLocaleDateString())},console.log(this.orderBusiness.order),0==Object.keys(this.orderBusiness.order).length&&this.router.navigate(["/orders/add"]),this.order=this.orderBusiness.order,console.log(this.order,this.orderBusiness.order),this.formObj=[[new u.O("Numero de Orden de Pedido","name","text")],[new u.O("Nombre del Client","clientName","text")],[new u.O("Fecha de Embarque","shipDate","date")],[new u.O("Dias de Produccion","productionDays","number"),new u.O("Pedido de Insumos","orderInput","number")],[new u.O("Pedido Materia Prima","rmOrderDeadline","date",[this.custom]),new u.O("Limite inicio de Produccion","startProductionDeadline","date")]]}ngAfterViewInit(){this.clientName$.subscribe(n=>this.formC.f.clientName.patchValue(n));var t=this.getProductionDays();this.formC.f.productionDays.patchValue(t),this.formC.f.productionDays.markAsTouched(),this.formC.f.orderInput.patchValue(this.order.orderWaitMaxTime),this.formC.f.orderInput.markAsTouched(),this.formC.f.shipDate.valueChanges.pipe((0,C.b)(n=>{this.formC.f.rmOrderDeadline.patchValue(this.getRmOrderDeadline(n,t,this.order.orderWaitMaxTime)),this.formC.f.rmOrderDeadline.markAsTouched(),this.formC.f.startProductionDeadline.patchValue(this.getStartProductionDeadline(n,t,this.order.orderWaitMaxTime)),this.formC.f.startProductionDeadline.markAsTouched()})).subscribe()}ngOnInit(){}filterProducts(){this.queryChange=this.q}getSelectedElement(t){this.order&&(this.clientName=t.element.name,this.clientName$.next(this.clientName),this.orderBusiness.order.clientId=t.element.id)}custom(t){return new Date(t.value)>new Date||null==t.value?null:{custom:"La fecha de Limite del Pedido de material debe ser almenos 2 dias despu\xe9s del dia actual"}}submit(t){this.orderBusiness.order=t,console.log(this.orderBusiness.order),this.create$=this.orderBusiness.editProducts().subscribe()}ngOnDestroy(){this.create$.unsubscribe()}formatDateString(t){return t.split("/").reverse().join("/").replace(/\//g,"-")}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(h.F0),e.Y36(D.e),e.Y36(P))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-add-order"]],viewQuery:function(t,r){if(1&t&&e.Gf(q.U,5),2&t){let n;e.iGM(n=e.CRH())&&(r.formC=n.first)}},decls:30,vars:14,consts:[[1,"container","mt-5","vh-100"],["role","search",1,"d-flex"],[1,"text-muted","text-nowrap","my-auto"],["type","search","name","query","placeholder","Buscar por Nombre","aria-label","Search",1,"form-control","ms-2","me-2","float-end",3,"ngModel","ngModelChange"],["type","submit",1,"btn","btn-outline-success","float-end",3,"click"],[1,"list","row","shadow-sm"],[1,"col-md-6"],[1,"text-muted","mt-1"],[3,"path","query","selectedElement"],["btnMes","Crear Orden","modalMessage","\xbfDesea continuar con la creacion de la Orden?",3,"formObj","formModel"],[1,"text-muted"],[1,"bold"],[1,"list-group","mt-3","mb-3"],["class","list-group-item",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"list-group-item"],[1,"d-flex","flex-row","justify-content-between"],[1,"my-auto"],[1,"input-group"],["type","number","placeholder","Unidades","name","UP","readonly","","aria-label","quantity",1,"form-control","input-sm",3,"ngModel","ngModelChange"],[1,"input-group-text"],["type","number","readonly","","placeholder","Disponible en PT","name","stock","aria-label","stock",1,"form-control","input-sm",3,"ngModel","ngModelChange"],[1,"form-check","input-group-append","mx-2","my-auto"],["for","flexCheckDefault",1,"form-check-label"],["readonly","","type","checkbox","id","flexCheckDefault","name","codeFilter",1,"form-check-input",3,"ngModel"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"form",1)(2,"h3",2),e._uU(3,"Registrar orden"),e.qZA(),e.TgZ(4,"input",3),e.NdJ("ngModelChange",function(o){return r.q=o}),e.qZA(),e.TgZ(5,"button",4),e.NdJ("click",function(){return r.filterProducts()}),e._uU(6,"Buscar"),e.qZA()(),e._UZ(7,"hr"),e.TgZ(8,"div",5)(9,"div",6)(10,"h5",7),e._uU(11,"Lista de Clientes:"),e.qZA(),e.TgZ(12,"app-pagination",8),e.NdJ("selectedElement",function(o){return r.getSelectedElement(o)}),e.qZA()(),e.TgZ(13,"div",6)(14,"h4"),e._uU(15,"Nueva Orden"),e.qZA(),e.TgZ(16,"app-form",9),e.NdJ("formModel",function(o){return r.submit(o)}),e.qZA(),e.TgZ(17,"h4",10),e._uU(18,"Total: "),e.qZA(),e.TgZ(19,"h5",11),e._uU(20),e.ALo(21,"currency"),e.qZA(),e.TgZ(22,"h5",11),e._uU(23),e.ALo(24,"currency"),e.qZA(),e.TgZ(25,"p"),e._uU(26,"productos de la Orden: "),e.qZA(),e.TgZ(27,"ul",12),e.YNc(28,ee,15,4,"li",13),e.qZA()(),e.YNc(29,te,4,0,"div",14),e.qZA()()),2&t&&(e.xp6(4),e.Q6J("ngModel",r.q),e.xp6(8),e.Q6J("path","/clients")("query",r.queryChange),e.xp6(4),e.Q6J("formObj",r.formObj),e.xp6(4),e.Oqu(e.xi3(21,8,r.order.total.mxn,"MXN")),e.xp6(3),e.hij(" ",e.xi3(24,11,r.order.total.usd,"USD"),""),e.xp6(5),e.Q6J("ngForOf",r.orderBusiness.orderProducts),e.xp6(1),e.Q6J("ngIf",!r.orderProducts))},dependencies:[m.sg,m.O5,q.U,l._Y,l.Fj,l.wV,l.Wl,l.JJ,l.JL,l.On,l.F,y.Q,m.H9]}),i})();var ne=d(5872);function ie(i,s){1&i&&(e.TgZ(0,"span"),e.O4$(),e.TgZ(1,"svg",12),e._UZ(2,"path",13),e.qZA()())}function oe(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"li",11),e.NdJ("click",function(){const n=e.CHM(t),o=n.$implicit,a=n.index,c=e.oxw();return e.KtG(c.setActiveMaterial(o,a))}),e._uU(1),e.YNc(2,ie,3,0,"span",10),e.qZA()}if(2&i){const t=s.$implicit,r=s.index,n=e.oxw();e.ekj("active",r==n.currentIndex),e.xp6(1),e.hij(" ",t.name," "),e.xp6(1),e.Q6J("ngIf",t.minBatch)}}function ae(i,s){if(1&i&&(e.TgZ(0,"option",19),e._uU(1),e.qZA()),2&i){const t=s.$implicit;e.Q6J("ngValue",t),e.xp6(1),e.Oqu(t.name)}}function se(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"div",14)(1,"select",15),e.NdJ("ngModelChange",function(n){e.CHM(t);const o=e.oxw();return e.KtG(o.currentProvider=n)}),e.TgZ(2,"option",16),e._uU(3,"Seleccione Provedor"),e.qZA(),e.YNc(4,ae,2,2,"option",17),e.qZA(),e.TgZ(5,"label",18),e._uU(6,"Provedores"),e.qZA()()}if(2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngModel",t.currentProvider),e.xp6(1),e.Q6J("ngValue",void 0),e.xp6(2),e.Q6J("ngForOf",t.providers)}}function de(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"button",20),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.assignProvider())}),e._uU(1," Asignar Provedores"),e.qZA()}}function le(i,s){1&i&&(e.TgZ(0,"div"),e._UZ(1,"br"),e.TgZ(2,"p"),e._uU(3,"No se selecciono ningun producto..."),e.qZA()())}const ue=[{path:"",component:Q},{path:"add",component:W},{path:"add/create",component:re},{path:"add/providers",component:(()=>{class i{constructor(t,r,n){this.orderBusiness=t,this.provService=r,this.router=n,this.stock$=new F.w0,this.materials=[],this.reqMaterials=[],this.providers=[],this.orderProducts=[],this.q="",this.query="",this.formObj=[[new u.O("Nombre","name","text"),new u.O("Lote Minimo","minBatch","number")],[new u.O("Descripcion","description","text")],[new u.O("Precio","price","number")],[new u.O("Cantidad en Inventario","available","number")],[new u.O("Tiempo de Entrega","deliveryTime","number")],[new u.O("Area","area","text"),new u.O("Zona","zone","text"),new u.O("Posicion","position","text")]]}ngOnInit(){(0==this.orderBusiness.materials.length||0==this.orderBusiness.orderProducts.length)&&this.router.navigate(["/orders/add"]),this.stock$=this.orderBusiness.updateProviderMaterialStock().subscribe(t=>{this.reqMaterials=t.filter(r=>r.requestMaterial),this.materials=t.filter(r=>!r.requestMaterial)})}ngOnDestroy(){this.stock$.unsubscribe()}initMaterialOrder(){this.reqMaterials.forEach(t=>{var r=t.requested<t.minBatch?t.minBatch-t.requested:0;t.newStock.wating+=r,t.amount=r})}filter(){this.q=this.query}setActiveMaterial(t,r){var n=this;return(0,M.Z)(function*(){n.providers=[],n.currentProvider=void 0,n.currentMaterial=t,n.currentIndex=r,n.providers=yield n.provService.getProvidersByMaterial(n.currentMaterial.matId)})()}assignProvider(){this.reqMaterials[this.currentIndex].minBatch=this.currentProvider.minBatch,this.reqMaterials[this.currentIndex].deliveryTime=this.currentProvider.deliveryTime,this.reqMaterials[this.currentIndex].price=this.currentProvider.price,alert("Provedor asignado satisfactoriamente")}getOrderWaitMaxTime(){return Math.max(...this.reqMaterials.map(t=>t.deliveryTime))}getSelectedElement(t){this.currentMaterial=t.element}submit(t){0==this.reqMaterials.filter(n=>!n.hasOwnProperty("minBatch")).length?(this.initMaterialOrder(),this.orderBusiness.order.orderWaitMaxTime=this.getOrderWaitMaxTime(),this.orderBusiness.order.orderProducts=this.orderProducts,this.orderBusiness.materials=this.materials,this.orderBusiness.reqMaterials=this.reqMaterials,this.router.navigate(["orders/add/create"])):alert("Aun hay materiales sin proveedor asignador, porfavor rectifique.")}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(P),e.Y36(ne.H),e.Y36(h.F0))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-order-providers"]],decls:17,vars:5,consts:[[1,"container","mt-5","vh-100"],[1,"text-muted","text-nowrap","my-auto"],[1,"list","row","shadow-sm"],[1,"col-md-6"],[1,"text-muted","mt-1"],[1,"list-group","mt-3","mb-3"],["class","list-group-item d-flex justify-content-between align-items-center",3,"active","click",4,"ngFor","ngForOf"],["class","form-floating",4,"ngIf"],["class","btn-outline-primary btn rounded-pill",3,"click",4,"ngIf"],["type","submit","modalMessage","\xbfSeguro que desea continuar crear una nueva orden?",3,"btnMessage","continue"],[4,"ngIf"],[1,"list-group-item","d-flex","justify-content-between","align-items-center",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","25","height","25","fill","green","viewBox","0 0 16 16",1,"bi","bi-check"],["d","M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"],[1,"form-floating"],["id","floatingSelect","aria-label","providers select",1,"form-select",3,"ngModel","ngModelChange"],["disabled","",3,"ngValue"],[3,"ngValue",4,"ngFor","ngForOf"],["for","floatingSelect"],[3,"ngValue"],[1,"btn-outline-primary","btn","rounded-pill",3,"click"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"h3",1),e._uU(2,"Registrar orden"),e.qZA(),e._UZ(3,"hr"),e.TgZ(4,"div",2)(5,"div",3)(6,"h5",4),e._uU(7,"Lista de Materiales:"),e.qZA(),e.TgZ(8,"ul",5),e.YNc(9,oe,3,4,"li",6),e.qZA()(),e.TgZ(10,"div",3)(11,"h4"),e._uU(12,"Seleccione un Proovedor"),e.qZA(),e.YNc(13,se,7,3,"div",7),e.YNc(14,de,2,0,"button",8),e.TgZ(15,"app-warn-modal",9),e.NdJ("continue",function(o){return r.submit(o)}),e.qZA(),e.YNc(16,le,4,0,"div",10),e.qZA()()()),2&t&&(e.xp6(9),e.Q6J("ngForOf",r.reqMaterials),e.xp6(4),e.Q6J("ngIf",r.providers.length),e.xp6(1),e.Q6J("ngIf",r.reqMaterials),e.xp6(1),e.Q6J("btnMessage","Continuar"),e.xp6(1),e.Q6J("ngIf",!r.materials))},dependencies:[m.sg,m.O5,S.u,l.YN,l.Kr,l.EJ,l.JJ,l.On]}),i})()}];let ce=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[h.Bz.forChild(ue),h.Bz]}),i})();var me=d(4466);let pe=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[m.ez,ce,me.m]}),i})()}}]);