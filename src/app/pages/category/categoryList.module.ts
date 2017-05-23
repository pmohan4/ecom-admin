import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {HttpModule} from "@angular/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {routing} from "./categoryList.routing";
import {RouterModule} from "@angular/router";
import {HttpService} from "../http/HttpService";
import {ServerResponseBarModule} from "../serverResponseBar/serverResponseBar.module";
import {CategoryList} from "./categoryList.component";
import {CategoryListService} from "./categoryList.service";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    HttpModule,
    RouterModule,
    ServerResponseBarModule

  ],
  declarations: [
    CategoryList
  ],
  providers: [
    CategoryListService,
    HttpService
  ]

})
export class CategoryListModule {
}
