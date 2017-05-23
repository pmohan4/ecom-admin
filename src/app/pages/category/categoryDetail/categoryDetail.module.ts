import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {routing} from "./categoryDetail.routing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {CategoryDetail} from "./categoryDetail.component";
import {CategoryDetailService} from "./categoryDetail.service";
import {ServerResponseBarModule} from "../../serverResponseBar/serverResponseBar.module";
import {HttpService} from "../../http/HttpService";
import {NgaModule} from "../../../theme/nga.module";
import {CategoryGeneral} from "./categoryGeneral.component";
import {CategoryXProducts} from "./categoryXProducts.component";
import {CategoryXRef} from "./categoryXRef.component";
import {CategoryXProductModal} from "./categoryXProductModal/categoryXProduct-modal.component";
import {CategoryXRefModal} from "./categoryXRefModal/categoryXRef-modal.component";


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    NgbModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    Ng2SmartTableModule,
    ServerResponseBarModule
  ],
  declarations: [
    CategoryDetail,
    CategoryGeneral,
    CategoryXProducts,
    CategoryXRef,
    CategoryXProductModal,
    CategoryXRefModal
  ],
  providers: [CategoryDetailService, HttpService
  ],
  entryComponents: [
    CategoryXProductModal,
    CategoryXRefModal
  ]
})

export class CategoryDetailModule {
}
