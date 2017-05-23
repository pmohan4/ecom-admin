import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./productDetail.routing";
import {ProductDetail} from "./productDetail.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductDetailService} from "./producdDetail.service";
import {HttpService} from "../http/HttpService";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ProductOptionModal} from "./poModal/product-options-modal.component";
import {ServerResponseBarModule} from "../serverResponseBar/serverResponseBar.module";


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
    ProductDetail,
    ProductOptionModal,
  ],
  providers: [ProductDetailService, HttpService
  ],
  entryComponents: [
    ProductOptionModal
  ]
})

export class ProductDetailModule {
}
