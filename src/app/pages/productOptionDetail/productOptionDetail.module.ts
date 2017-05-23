import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {routing} from "./productOptionDetail.routing";
import {ProductOptionDetail} from "./productOptionDetail.component";
import {ProductOptionDetailService} from "./productOptionDetail.service";
import {HttpService} from "../http/HttpService";
import {ServerResponseBarModule} from "../serverResponseBar/serverResponseBar.module";

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule,
    ServerResponseBarModule
  ],
  declarations: [
    ProductOptionDetail

  ],
  providers: [
    ProductOptionDetailService,
    HttpService
  ]
})
export class ProductOptionDetailModule {
}
