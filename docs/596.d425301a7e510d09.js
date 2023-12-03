"use strict";(self.webpackChunkInvFurniture=self.webpackChunkInvFurniture||[]).push([[596],{2596:(w,y,u)=>{u.r(y),u.d(y,{ProductModule:()=>$});var i=u(6895),v=u(2827),b=u(6535),e=u(4650),C=u(3651),o=u(4006),h=u(5748),c=u(4985),_=u(7915),x=u(727),s=u(8505),f=u(1350),d=u(33);let p=(()=>{class r{constructor(t){this.db=t,this.dbPath="/products",this.productsRef=t.collection(this.dbPath)}getById(t){return this.productsRef.doc(t).get()}getNextBatch(t,n){return this.db.collection(this.dbPath,n?a=>a.orderBy("timestamp","desc").startAfter(n.timestamp).limit(t):a=>a.orderBy("timestamp","desc").limit(t))}getPrevBatch(t,n,a){return this.db.collection(this.dbPath,l=>l.orderBy("timestamp","desc").startAt(n).endBefore(a).limit(t))}getBatch(t){return this.db.collection(this.dbPath,n=>n.limit(t).orderBy("timestamp","desc"))}getAll(){return this.productsRef}create(t){return this.productsRef.add({...t})}update(t,n){return this.productsRef.doc(t).update(n)}delete(t){return this.productsRef.doc(t).delete()}filterByNameBatch(t,n,a){return this.db.collection(this.dbPath,a?l=>l.where("name",">=",t).where("name","<=",t+"\uf8ff").orderBy("name","desc").startAfter(a.name).limit(n):l=>l.where("name",">=",t).where("name","<=",t+"\uf8ff").orderBy("name","desc").limit(n))}filterByCodeBatch(t,n,a){return this.db.collection(this.dbPath,a?l=>l.where("code",">=",t).where("code","<=",t+"\uf8ff").orderBy("code","desc").startAfter(a.code).limit(n):l=>l.where("code",">=",t).where("code","<=",t+"\uf8ff").orderBy("code","desc").limit(n))}filterByName(t){return this.db.collection(this.dbPath,n=>n.where("name",">=",t).where("name","<=",t+"\uf8ff"))}filterByCode(t){return this.db.collection(this.dbPath,n=>n.where("code",">=",t).where("code","<=",t+"\uf8ff"))}}return r.\u0275fac=function(t){return new(t||r)(e.LFG(d.ST))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();var g=u(9898);function P(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"button",6),e.NdJ("click",function(){e.CHM(t);const a=e.oxw(2);return e.KtG(a.deleteProduct())}),e._uU(1," Eliminar "),e.qZA()}}function M(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"div",2)(1,"h4"),e._uU(2,"Producto"),e.qZA(),e.TgZ(3,"app-form",3),e.NdJ("formModel",function(a){e.CHM(t);const l=e.oxw();return e.KtG(l.submit(a))}),e.qZA(),e.YNc(4,P,2,0,"button",4),e.TgZ(5,"button",5),e._uU(6," Materiales "),e.qZA(),e.TgZ(7,"p"),e._uU(8),e.qZA()()}if(2&r){const t=e.oxw();e.xp6(3),e.Q6J("formObj",t.formObj)("mode",!t.userRole)("placeHolder",t.currentProduct),e.xp6(1),e.Q6J("ngIf",t.userRole),e.xp6(1),e.Q6J("state",t.currentProduct),e.xp6(3),e.Oqu(t.message)}}function Z(r,m){1&r&&(e.TgZ(0,"div"),e._UZ(1,"br"),e.TgZ(2,"p"),e._uU(3,"No fue posible acceder a este producto..."),e.qZA()())}let B=(()=>{class r{constructor(t,n,a){this.productService=t,this.auth=n,this.FpService=a,this.refreshList=new e.vpe,this.currentProduct={name:"",description:"",code:"",price:0,leadTime:0,stock:0,capacityByTurn:0},this.message="",this.onLeadTime$=new x.w0,this.round=l=>Math.round(100*l)/100,this.auth.user$.subscribe(l=>this.userRole=l?.userRole),this.formObj=[[new c.O("Nombre","name","text").setReadOnly(!0),new c.O("Codigo","code","text")],[new c.O("Descripcion","description","text")],[new c.O("Volumen","volume","number",[this.custom]),new c.O("Peso","weight","number",[this.custom]),new c.O("Unidad de Medida","units","text")],[new c.O("Precio","price","number",[this.custom]),new c.O("Tipo IVA","iva","number",[this.custom]),new c.O("Divisa","currency","select")],[new c.O("Cantidad en Inventario","stock","number"),new c.O("Unidad de CFDI","cfdiUnit","text"),new c.O("Unidad de CFDI","cfdiKey","text"),new c.O("SKU","sku","text")],[new c.O("No Producto","noproduct","number"),new c.O("Capacidad por turno","capacityByTurn","number",[this.custom]),new c.O("Tiempo de Produccion","leadTime","number").setReadOnly(!0)]]}ngAfterViewInit(){this.onLeadTime$=this.formC.f.capacityByTurn.valueChanges.pipe((0,s.b)(t=>this.formC.f.leadTime.patchValue(this.round(1/t)))).subscribe()}ngOnInit(){this.message=""}custom(t){return t.value>0||null==t.value?null:{custom:"debe ser positivo"}}ngOnChanges(){this.message="",this.currentProduct={...this.product}}submit(t){this.currentProduct=t,this.updateProduct()}onNgDestory(){this.onLeadTime$.unsubscribe()}updateProduct(){const{stock:t,...n}=this.currentProduct;this.currentProduct.id&&(0,f.z)(this.productService.update(this.currentProduct.id,n),this.FpService.update(this.currentProduct.invId,{available:t})).subscribe({complete:()=>{this.refreshList.emit(),this.message="El producto fue actualizado satisfactoriamente!"},error:a=>alert("Ah ocurrido un error inesperado, intente de nuevo o recargue la p\xe1gina.")})}deleteProduct(){this.currentProduct.id&&this.productService.delete(this.currentProduct.id).then(()=>{this.refreshList.emit(),this.message="El producto fue eliminado satisfactoriamente!"}).catch(t=>console.log(t))}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(p),e.Y36(C.e),e.Y36(g.L))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-product-details"]],viewQuery:function(t,n){if(1&t&&e.Gf(_.U,5),2&t){let a;e.iGM(a=e.CRH())&&(n.formC=a.first)}},inputs:{product:"product"},outputs:{refreshList:"refreshList"},features:[e.TTD],decls:2,vars:2,consts:[["class","edit-form",4,"ngIf"],[4,"ngIf"],[1,"edit-form"],["btnMes","Editar Material","modalMessage","\xbfSeguro que desea editar el producto?",3,"formObj","mode","placeHolder","formModel"],["class","ms-2 btn btn-danger rounded-pill",3,"click",4,"ngIf"],["routerLink","material",1,"ms-2","btn","btn-secondary","rounded-pill",3,"state"],[1,"ms-2","btn","btn-danger","rounded-pill",3,"click"]],template:function(t,n){1&t&&(e.YNc(0,M,9,6,"div",0),e.YNc(1,Z,4,0,"div",1)),2&t&&(e.Q6J("ngIf",n.currentProduct),e.xp6(1),e.Q6J("ngIf",!n.currentProduct))},dependencies:[i.O5,v.rH,_.U]}),r})();function I(r,m){1&r&&(e.TgZ(0,"button",14),e.O4$(),e.TgZ(1,"svg",15),e._UZ(2,"g",16)(3,"g",17),e.TgZ(4,"g",18)(5,"g"),e._UZ(6,"path",19),e.qZA()()()())}function U(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"div")(1,"app-product-details",20),e.NdJ("refreshList",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.refreshList())}),e.qZA()()}if(2&r){const t=e.oxw();e.xp6(1),e.Q6J("product",t.currentProduct)}}function E(r,m){1&r&&(e.TgZ(0,"div"),e._UZ(1,"br"),e.TgZ(2,"p"),e._uU(3,"Seleccione un producto..."),e.qZA()())}let F=(()=>{class r{constructor(t){this.auth=t,this.title="",this.q="",this.query="",this.codeFilter=!1,this.userRole="a"}ngOnInit(){}refreshList(){this.currentProduct=void 0}filter(){this.q=this.codeFilter?{key:"code",value:this.query}:this.query,this.refreshList()}getSelectedElement(t){this.currentProduct=t.element}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(C.e))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-product-list"]],features:[e._Bn([b.U,{provide:"path",useValue:"/products"}])],decls:20,vars:7,consts:[[1,"container","mt-5","vh-100"],["role","search",1,"d-flex"],[1,"text-muted","text-nowrap"],[1,"ms-5","form-check"],["for","flexCheckDefault",1,"form-check-label"],["type","checkbox","id","flexCheckDefault","name","codeFilter",1,"form-check-input",3,"ngModel","ngModelChange"],["id","query","type","search","oninput","this.value = this.value.toLowerCase()","name","query","placeholder","Buscar por Nombre o Codigo","aria-label","Search",1,"form-control","ms-2","me-2","float-end",3,"ngModel","ngModelChange"],["type","submit",1,"btn","btn-outline-success","float-end",3,"click"],[1,"position-fixed","bottom-0","end-0",2,"margin","6rem","z-index","1070"],["class","btn btn-success btn-lg rounded-pill","routerLink","add",4,"ngIf"],[1,"list","row","shadow-sm"],[1,"col-md-6"],[3,"path","query","selectedElement"],[4,"ngIf"],["routerLink","add",1,"btn","btn-success","btn-lg","rounded-pill"],["fill","#ffffff","version","1.1","id","Capa_1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","width","4vh","height","4vh","viewBox","0 0 47 47",0,"xml","space","preserve","stroke","#ffffff"],["id","SVGRepo_bgCarrier","stroke-width","0"],["id","SVGRepo_tracerCarrier","stroke-linecap","round","stroke-linejoin","round"],["id","SVGRepo_iconCarrier"],["d","M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"],[3,"product","refreshList"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"form",1)(2,"h4",2),e._uU(3,"Lista de Productos"),e.qZA(),e.TgZ(4,"div",3)(5,"label",4),e._uU(6," Filtro por Codigo "),e.qZA(),e.TgZ(7,"input",5),e.NdJ("ngModelChange",function(l){return n.codeFilter=l}),e.qZA()(),e.TgZ(8,"input",6),e.NdJ("ngModelChange",function(l){return n.query=l}),e.qZA(),e.TgZ(9,"button",7),e.NdJ("click",function(){return n.filter()}),e._uU(10,"Buscar"),e.qZA()(),e._UZ(11,"hr"),e.TgZ(12,"div",8),e.YNc(13,I,7,0,"button",9),e.qZA(),e.TgZ(14,"div",10)(15,"div",11)(16,"app-pagination",12),e.NdJ("selectedElement",function(l){return n.getSelectedElement(l)}),e.qZA()(),e.TgZ(17,"div",11),e.YNc(18,U,2,1,"div",13),e.YNc(19,E,4,0,"div",13),e.qZA()()()),2&t&&(e.xp6(7),e.Q6J("ngModel",n.codeFilter),e.xp6(1),e.Q6J("ngModel",n.query),e.xp6(5),e.Q6J("ngIf",n.userRole),e.xp6(3),e.Q6J("path","/products")("query",n.q),e.xp6(2),e.Q6J("ngIf",n.currentProduct),e.xp6(1),e.Q6J("ngIf",!n.currentProduct))},dependencies:[i.O5,v.rH,o._Y,o.Fj,o.Wl,o.JJ,o.JL,o.On,o.F,h.Q,B]}),r})();class O{}var A=u(8179),q=u(798);function N(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"div")(1,"div",4)(2,"div",5)(3,"app-form",6),e.NdJ("formModel",function(a){e.CHM(t);const l=e.oxw();return e.KtG(l.submit(a))}),e.qZA()()()()}if(2&r){const t=e.oxw();e.xp6(3),e.Q6J("formObj",t.formObj)("mode",!t.userRole)}}function D(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"div",7)(1,"h4"),e._uU(2,"El producto a sido registrado Satisfactoriamente!"),e.qZA(),e.TgZ(3,"button",8),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.newProduct())}),e._uU(4,"A\xf1adir Otro"),e.qZA()()}}function J(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"div",14)(1,"select",15),e.NdJ("ngModelChange",function(a){e.CHM(t);const l=e.oxw();return e.KtG(l.q=a)}),e.TgZ(2,"option",16),e._uU(3,"Seleccione Inventario"),e.qZA(),e.TgZ(4,"option",17),e._uU(5,"CORTE Y ENSAMBLE"),e.qZA(),e.TgZ(6,"option",18),e._uU(7,"CONSUMIBLE"),e.qZA(),e.TgZ(8,"option",19),e._uU(9,"CARPINTERIA"),e.qZA()(),e.TgZ(10,"label",20),e._uU(11,"Inventario"),e.qZA()()}if(2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngModel",t.q),e.xp6(1),e.Q6J("ngValue",void 0)}}function L(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"input",21),e.NdJ("ngModelChange",function(a){e.CHM(t);const l=e.oxw();return e.KtG(l.q=a)}),e.qZA()}if(2&r){const t=e.oxw();e.Q6J("ngModel",t.q)}}function S(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"div",22)(1,"app-pagination",23),e.NdJ("selectedElement",function(a){e.CHM(t);const l=e.oxw();return e.KtG(l.getSelectedElement(a))}),e.qZA()()}if(2&r){const t=e.oxw();e.xp6(1),e.Q6J("path","/materials")("query",t.queryChange)}}function k(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"li",29)(1,"div",30)(2,"span",31),e._uU(3),e.qZA(),e.TgZ(4,"div",32)(5,"input",33),e.NdJ("ngModelChange",function(a){const T=e.CHM(t).$implicit;return e.KtG(T.quantity=a)}),e.qZA(),e.TgZ(6,"span",34),e._uU(7,"U"),e.qZA()(),e.TgZ(8,"button",35),e.NdJ("click",function(){const l=e.CHM(t).index,T=e.oxw(2);return e.KtG(T.removeMaterialToProduct(l))}),e.qZA()()()}if(2&r){const t=m.$implicit;e.xp6(3),e.hij(" ",t.name," "),e.xp6(2),e.Q6J("ngModel",t.quantity)}}function K(r,m){if(1&r){const t=e.EpF();e.TgZ(0,"button",36),e.NdJ("click",function(){e.CHM(t);const a=e.oxw(2);return e.KtG(a.editMaterials())}),e._uU(1," Agregar Matriales "),e.qZA()}}function Q(r,m){if(1&r&&(e.TgZ(0,"div",24)(1,"h4"),e._uU(2,"Producto"),e.qZA(),e.TgZ(3,"h3",25),e._uU(4),e.qZA(),e.TgZ(5,"p"),e._uU(6,"Materiales del Producto: "),e.qZA(),e.TgZ(7,"ul",26),e.YNc(8,k,9,2,"li",27),e.qZA(),e.YNc(9,K,2,0,"button",28),e.qZA()),2&r){const t=e.oxw();e.xp6(4),e.AsE("",t.product.name," - ",t.product.code,""),e.xp6(4),e.Q6J("ngForOf",t.productMaterials),e.xp6(1),e.Q6J("ngIf",t.userRole)}}function Y(r,m){1&r&&(e.TgZ(0,"div"),e._UZ(1,"br"),e.TgZ(2,"p"),e._uU(3,"No fue posible acceder a este producto..."),e.qZA()())}function j(r,m){1&r&&(e.TgZ(0,"div"),e._UZ(1,"br"),e.TgZ(2,"p"),e._uU(3,"Seleccione un producto..."),e.qZA()())}const V=[{path:"",component:F},{path:"add",component:(()=>{class r{constructor(t,n,a,l){this.invFpService=t,this.auditService=n,this.fos=a,this.auth=l,this.product=new O,this.submitted=!1,this.username="anonimo",this.onLeadTime$=new x.w0,this.round=T=>Math.round(100*T)/100,this.auth.user$.subscribe(T=>{this.username=T?.displayName,this.userRole=T?.userRole}),this.formObj=[[new c.O("Nombre","name","text"),new c.O("Codigo","code","text")],[new c.O("Descripcion","description","text")],[new c.O("Volumen","volume","number",[this.custom]),new c.O("Peso","weight","number",[this.custom]),new c.O("Unidad de Medida","units","text")],[new c.O("Precio","price","number",[this.custom]),new c.O("Tipo IVA","iva","number",[this.custom]),new c.O("Divisa","currency","select",[],["MXN","USD"])],[new c.O("Cantidad en Inventario","stock","number"),new c.O("Unidad de CFDI","cfdiUnit","text"),new c.O("Unidad de CFDI","cfdiKey","text"),new c.O("SKU","sku","text")],[new c.O("No Producto","noproduct","number"),new c.O("Capacidad por turno","capacityByTurn","number",[this.custom]),new c.O("Tiempo de Produccion","leadTime","number").setReadOnly(!0)]]}ngAfterViewInit(){this.onLeadTime$=this.formC.f.capacityByTurn.valueChanges.pipe((0,s.b)(t=>this.formC.f.leadTime.patchValue(this.round(1/t)))).subscribe()}custom(t){return t.value>0||null==t.value?null:{custom:"debe ser positivo"}}submit(t){this.product=t,this.saveProduct()}saveProduct(){this.product.timestamp=A.EK.fromDate(new Date);var{stock:t,...n}=this.product;this.invFpService.create({available:+(t??0),name:n.name,commited:0,wating:0,timestamp:A.EK.fromDate(new Date)}).then(a=>{n.invId=a.id,this.fos.create(n,a.id),this.auditService.create(g.L.name,`Crear Producto: ${this.product.name}`,this.username??"anonimo",JSON.stringify({available:+(t??0),name:n.name,commited:0,wating:0,timestamp:A.EK.fromDate(new Date)})),this.submitted=!0})}onNgDestory(){this.onLeadTime$.unsubscribe()}newProduct(){this.submitted=!1,this.product=new O}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(g.L),e.Y36(q.C),e.Y36(b.U),e.Y36(C.e))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-add-product"]],viewQuery:function(t,n){if(1&t&&e.Gf(_.U,5),2&t){let a;e.iGM(a=e.CRH())&&(n.formC=a.first)}},features:[e._Bn([b.U,{provide:"path",useValue:"/products"}])],decls:6,vars:2,consts:[[1,"container","vh-100"],[1,"text-muted","mt-5"],[4,"ngIf"],["class","mt-3",4,"ngIf"],[1,"card","mt-4","bg-light","shadow-lg","border-0"],[1,"card-body"],["btnMes","Crear Producto","modalMessage","\xbfDesea continuar con la creacion del producto?",3,"formObj","mode","formModel"],[1,"mt-3"],[1,"btn","btn-outline-success","mt-2",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"h5",1),e._uU(2," Registro del Producto"),e.qZA(),e._UZ(3,"hr"),e.YNc(4,N,4,2,"div",2),e.YNc(5,D,5,0,"div",3),e.qZA()),2&t&&(e.xp6(4),e.Q6J("ngIf",!n.submitted),e.xp6(1),e.Q6J("ngIf",n.submitted))},dependencies:[i.O5,_.U]}),r})()},{path:"material",component:(()=>{class r{constructor(t,n,a){this.productService=t,this.router=n,this.auth=a,this.currentIndex=-1,this.title="",this.q="",this.queryChange=void 0,this.areaFilter="",this.productMaterials=[],this.auth.user$.subscribe(l=>this.userRole=l?.userRole)}ngOnInit(){history.state.id||this.router.navigate(["/products"]),this.product=history.state,this.product?.materials&&(this.productMaterials=this.product.materials)}filter(){this.queryChange=this.areaFilter?{key:"area",value:this.q,exact:!0}:this.q,this.currentMaterial=void 0,this.currentIndex=-1}onFilterChange(){this.q=void 0}getSelectedElement(t){this.currentMaterial=t.element,this.currentIndex=t.index,this.addMaterialToProduct(this.currentMaterial)}addMaterialToProduct(t){this.productMaterials.find(a=>a.id==t.id)||this.productMaterials.push({name:t.name,id:t.id})}removeMaterialToProduct(t){this.productMaterials.splice(t,1)}editMaterials(){this.product&&this.productMaterials&&this.productService.update(this.product?.id,{materials:this.productMaterials}).then(()=>{alert("Materiales Actualizados Satisfactoriamente"),this.router.navigate(["/products"])})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(p),e.Y36(v.F0),e.Y36(C.e))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-product-materials"]],decls:19,vars:7,consts:[[1,"container","mt-5","vh-100"],["role","search",1,"d-flex"],[1,"text-muted","text-nowrap","my-auto"],[1,"ms-5","form-check"],["for","flexCheckDefault",1,"form-check-label"],["type","checkbox","id","flexCheckDefault","name","areaFilter",1,"form-check-input",3,"ngModel","ngModelChange","change"],["class","form-floating ms-2 me-2 w-50",4,"ngIf"],["class","form-control ms-2 me-2 float-end","type","search","name","query","oninput","this.value = this.value.toLowerCase()","placeholder","Buscar por Nombre","aria-label","Search",3,"ngModel","ngModelChange",4,"ngIf"],["type","submit",1,"btn","btn-outline-success","float-end",3,"click"],[1,"list","row","shadow-sm"],["class","col-md-6",4,"ngIf"],["ngClass","userRole ? ['col-md-6', 'col-md-12']",1,"col-md-6"],["class","edit-form",4,"ngIf"],[4,"ngIf"],[1,"form-floating","ms-2","me-2","w-50"],["name","Inventory","id","floatingSelect","aria-label","providers select",1,"form-select",3,"ngModel","ngModelChange"],["disabled","",3,"ngValue"],["ngValue","Corte y Ensamble"],["ngValue","Consumible"],["ngValue","Carpinteria"],["for","floatingSelect"],["type","search","name","query","oninput","this.value = this.value.toLowerCase()","placeholder","Buscar por Nombre","aria-label","Search",1,"form-control","ms-2","me-2","float-end",3,"ngModel","ngModelChange"],[1,"col-md-6"],[3,"path","query","selectedElement"],[1,"edit-form"],[1,"text-muted"],[1,"list-group","mt-3","mb-3"],["class","list-group-item",4,"ngFor","ngForOf"],["type","submit","class","btn btn-success mb-2 rounded-pill",3,"click",4,"ngIf"],[1,"list-group-item"],[1,"d-flex","flex-row","justify-content-between"],[1,"my-auto","mx-1"],[1,"input-group","mx-1"],["type","number","min","1","step","1","oninput","validity.valid||(value='') || Number.isInteger(value);","placeholder","Unidades por Producto","name","UP","aria-label","quantity",1,"form-control","input-sm",3,"ngModel","ngModelChange"],[1,"input-group-text"],[1,"btn-close","my-auto","btn-sm","rounded-pill","float-end",3,"click"],["type","submit",1,"btn","btn-success","mb-2","rounded-pill",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"form",1)(2,"h4",2),e._uU(3,"Lista de Materiales del Producto"),e.qZA(),e.TgZ(4,"div",3)(5,"label",4),e._uU(6," Filtro por Area "),e.qZA(),e.TgZ(7,"input",5),e.NdJ("ngModelChange",function(l){return n.areaFilter=l})("change",function(){return n.onFilterChange()}),e.qZA()(),e.YNc(8,J,12,2,"div",6),e.YNc(9,L,1,1,"input",7),e.TgZ(10,"button",8),e.NdJ("click",function(){return n.filter()}),e._uU(11,"Buscar"),e.qZA()(),e._UZ(12,"hr"),e.TgZ(13,"div",9),e.YNc(14,S,2,2,"div",10),e.TgZ(15,"div",11),e.YNc(16,Q,10,4,"div",12),e.YNc(17,Y,4,0,"div",13),e.YNc(18,j,4,0,"div",13),e.qZA()()()),2&t&&(e.xp6(7),e.Q6J("ngModel",n.areaFilter),e.xp6(1),e.Q6J("ngIf",n.areaFilter),e.xp6(1),e.Q6J("ngIf",!n.areaFilter),e.xp6(5),e.Q6J("ngIf",n.userRole),e.xp6(2),e.Q6J("ngIf",n.product),e.xp6(1),e.Q6J("ngIf",!n.product),e.xp6(1),e.Q6J("ngIf",!n.product))},dependencies:[i.mk,i.sg,i.O5,o._Y,o.YN,o.Kr,o.Fj,o.wV,o.Wl,o.EJ,o.JJ,o.JL,o.qQ,o.On,o.F,h.Q]}),r})()}];let G=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[v.Bz.forChild(V),v.Bz]}),r})();var H=u(4466);let $=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[i.ez,G,H.m]}),r})()},798:(w,y,u)=>{u.d(y,{C:()=>c});var i=u(8179),v=u(4004),b=u(7886),e=u(1402),C=u(5577),o=u(4650),h=u(33);let c=(()=>{class _{constructor(s){this.db=s,this.dbPath="/audit",this.objectsRef=s.collection(this.dbPath)}getNextBatch(s,f){return this.db.collection(this.dbPath,f?d=>d.orderBy("timestamp","desc").startAfter(f.timestamp).limit(s):d=>d.orderBy("timestamp","desc").limit(s))}create(s,f,d,p,g,P){var M={name:s,process:f,posterior:p,timestamp:i.EK.fromDate(new Date),user:d};return g&&(M.prior=g),P&&(M.itemId=P),this.objectsRef.add({...M})}update(s,f){return this.objectsRef.doc(s).update(f)}delete(s){return this.objectsRef.doc(s).delete()}deleteAll(){return this.objectsRef.get().pipe((0,v.U)(s=>s.docs),(0,b.u)(),(0,e.j)(500),(0,C.z)(s=>{var f=this.db.firestore.batch();return s.map(d=>f.delete(d.ref)),f.commit()}))}filterByDateBatch(s,f,d,p,g){return console.log(d),this.db.collection(this.dbPath,P=>P.where("timestamp",">=",s).where("timestamp","<=",f).where("name","==",d).orderBy("timestamp","desc").limit(p))}filterByNameBatch(s,f,d){return this.db.collection(this.dbPath,d?p=>p.where("name",">=",s).where("name","<=",s+"\uf8ff").orderBy("name","desc").startAfter(d.name).limit(f):p=>p.where("name",">=",s).where("name","<=",s+"\uf8ff").orderBy("name","desc").limit(f))}filterByCodeBatch(s,f,d){return this.db.collection(this.dbPath,d?p=>p.where("code",">=",s).where("code","<=",s+"\uf8ff").orderBy("code","desc").startAfter(d.code).limit(f):p=>p.where("code",">=",s).where("code","<=",s+"\uf8ff").orderBy("code","desc").limit(f))}}return _.\u0275fac=function(s){return new(s||_)(o.LFG(h.ST))},_.\u0275prov=o.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),_})()},6535:(w,y,u)=>{u.d(y,{U:()=>b});var i=u(4650),v=u(33);let b=(()=>{class e{constructor(o,h){this.db=o,this.path=h,this.objectRef=o.collection(this.path)}pathSetter(o){this.path=o,this.objectRef=this.db.collection(this.path)}pathGetter(){return this.path}getNextBatch(o,h){return this.db.collection(this.path,h?c=>c.orderBy("timestamp","desc").startAfter(h.timestamp).limit(o):c=>c.orderBy("timestamp","desc").limit(o))}getAll(){return this.objectRef}getByKey(o,h){return this.db.collection(this.path,c=>c.where(o,"==",h))}create(o,h){return h?this.objectRef.doc(h).set(o):this.objectRef.add({...o})}update(o,h){return this.objectRef.doc(o).update(h)}delete(o){return this.objectRef.doc(o).delete()}filterByNameBatch(o,h,c){return this.db.collection(this.path,c?_=>_.where("name",">=",o).where("name","<=",o+"\uf8ff").orderBy("name","desc").startAfter(c.name).limit(h):_=>_.where("name",">=",o).where("name","<=",o+"\uf8ff").orderBy("name","desc").limit(h))}filterUrgent(o,h,c){return this.db.collection(this.path,c?_=>_.where("orderDeadline","<=",o).orderBy("orderDeadline","asc").startAfter(c.name).limit(h):_=>_.where("orderDeadline","<=",o).orderBy("orderDeadline","asc").limit(h))}filterByKeyBatch(o,h,c,_,x){return"orderDeadline"==o?this.filterUrgent(h,c,_):this.db.collection(this.path,_?x?s=>s.where(o,"==",h).orderBy("timestamp","desc").startAfter(_.timestamp).limit(c):s=>s.where(o,">=",h).where(o,"<=",h+"\uf8ff").orderBy(o,"desc").startAfter(_[o]).limit(c):x?s=>s.where(o,"==",h).orderBy("timestamp","desc").limit(c):s=>s.where(o,">=",h).where(o,"<=",h+"\uf8ff").orderBy(o,"desc").limit(c))}}return e.\u0275fac=function(o){return new(o||e)(i.LFG(v.ST),i.LFG("path"))},e.\u0275prov=i.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},5748:(w,y,u)=>{u.d(y,{Q:()=>x});var i=u(4650),v=u(4004),b=u(6535),e=u(6895);function C(s,f){if(1&s&&(i.TgZ(0,"div",15),i._uU(1),i.qZA()),2&s){const d=i.oxw().$implicit,p=i.oxw().$implicit,g=i.oxw(2);i.xp6(1),i.hij(" ",p[d].toDate().toLocaleDateString("es-MX",g.dateOptions)," ")}}function o(s,f){if(1&s&&(i.TgZ(0,"div"),i._uU(1),i.qZA()),2&s){const d=i.oxw().$implicit,p=i.oxw().$implicit;i.xp6(1),i.hij(" ",p[d]," ")}}function h(s,f){if(1&s&&(i.TgZ(0,"div"),i.YNc(1,C,2,1,"div",13),i.YNc(2,o,2,1,"div",14),i.qZA()),2&s){const d=f.$implicit;i.xp6(1),i.Q6J("ngIf","orderDeadline"==d),i.xp6(1),i.Q6J("ngIf","orderDeadline"!=d)}}function c(s,f){if(1&s){const d=i.EpF();i.TgZ(0,"li",10),i.NdJ("click",function(){const g=i.CHM(d),P=g.$implicit,M=g.index,Z=i.oxw(2);return i.KtG(Z.setActiveProduct(P,M))}),i.TgZ(1,"span",11),i.YNc(2,h,3,2,"div",12),i.qZA()()}if(2&s){const d=f.index,p=i.oxw(2);i.ekj("active",d==p.currentIndex),i.xp6(2),i.Q6J("ngForOf",p.showParams)}}function _(s,f){if(1&s&&(i.TgZ(0,"ul",8),i.YNc(1,c,3,3,"li",9),i.qZA()),2&s){const d=i.oxw();i.xp6(1),i.Q6J("ngForOf",d.elementArray)}}let x=(()=>{class s{constructor(d){this.fos=d,this.selectedElement=new i.vpe,this.fetchedArray=new i.vpe,this.showParams=["name"],this.mode=!1,this.key="name",this.dateOptions={weekday:"long",year:"numeric",month:"long",day:"numeric"},this.currentIndex=-1,this.isFetched=!1,this.firstCall=!0,this.disableNext=!1,this.disablePrev=!0,this.updateProducts=!1,this.elementArray=[],this.lastInResponses=[],this.cached=[],this.queryChange=void 0,this.filterKey="name",this.exact=!1,this.elementPerCall=2}ngOnInit(){this.path||(this.path="/products"),this.fos.pathSetter(this.path),this.nextPage(!0),this.filterKey=this.key,this.firstCall=!1}setActiveProduct(d,p){this.currentIndex=p,this.selectedElement.emit({element:d,index:p})}nextPage(d){var p;if(d){if(this.disableNext)return;p=this.elementArray.at(-1),this.lastInResponses.push(p)}else{if(this.disablePrev)return;this.lastInResponses?.pop(),p=this.lastInResponses?.at(-1)}this.req=this.queryChange?this.fos.filterByKeyBatch(this.key,this.queryChange,this.elementPerCall,p,this.exact):this.fos.getNextBatch(this.elementPerCall,p),this.req.get().pipe((0,v.U)(g=>g.docs.map(P=>({id:P.id,...P.data()})))).subscribe({next:g=>{if(!g.length)return this.disableNext=!0,void this.lastInResponses?.pop();this.elementArray=g,this.disableNext=g.length<this.elementPerCall,this.disablePrev=!p,this.isFetched=!0,this.mode&&this.fetchedArray.emit(this.elementArray)},error:g=>alert(g),complete:()=>console.log("SI completo")})}resetPagination(){this.disableNext=!1,this.disablePrev=!0,this.currentIndex=-1,this.currentElement=void 0,this.elementArray=[],this.lastInResponses=[]}ngOnChanges(d){this.firstCall||(this.isFetched=!1,d.path&&this.fos.pathSetter(d.path.currentValue),d.key&&console.log("Key Changed"),d.query&&(d.query.currentValue instanceof Object?(this.queryChange=d.query.currentValue.value,this.key=d.query.currentValue.key?d.query.currentValue.key:this.filterKey,this.exact=!!d.query.currentValue.exact):(this.queryChange=d.query.currentValue,this.key=this.filterKey,this.exact=!1),console.log(this.key,this.queryChange)),this.filterProducts())}filterProducts(){this.resetPagination(),this.nextPage(!0)}}return s.\u0275fac=function(d){return new(d||s)(i.Y36(b.U))},s.\u0275cmp=i.Xpm({type:s,selectors:[["app-pagination"]],inputs:{query:"query",path:"path",showParams:"showParams",mode:"mode",key:"key"},outputs:{selectedElement:"selectedElement",fetchedArray:"fetchedArray"},features:[i._Bn([b.U,{provide:"path",useValue:"/RMreport"}]),i.TTD],decls:14,vars:1,consts:[["aria-label","Page navigation",1,"my-3"],[1,"pagination"],[1,"page-item"],["aria-label","Previous",1,"page-link",3,"click"],["aria-hidden","true"],[1,"page-link","text-black"],["aria-label","Next",1,"page-link",3,"click"],["class","list-group mt-3 mb-3",4,"ngIf"],[1,"list-group","mt-3","mb-3"],["class","list-group-item",3,"active","click",4,"ngFor","ngForOf"],[1,"list-group-item",3,"click"],[1,"d-flex"],[4,"ngFor","ngForOf"],["class","ms-2",4,"ngIf"],[4,"ngIf"],[1,"ms-2"]],template:function(d,p){1&d&&(i.TgZ(0,"nav",0)(1,"ul",1)(2,"li",2)(3,"button",3),i.NdJ("click",function(){return p.nextPage(!1)}),i.TgZ(4,"span",4),i._uU(5,"\xab"),i.qZA()()(),i.TgZ(6,"li",2)(7,"span",5),i._uU(8," Anterior/Siguiente Registro"),i.qZA()(),i.TgZ(9,"li",2)(10,"button",6),i.NdJ("click",function(){return p.nextPage(!0)}),i.TgZ(11,"span",4),i._uU(12,"\xbb"),i.qZA()()()()(),i.YNc(13,_,2,1,"ul",7)),2&d&&(i.xp6(13),i.Q6J("ngIf",!p.mode&&p.isFetched))},dependencies:[e.sg,e.O5]}),s})()}}]);