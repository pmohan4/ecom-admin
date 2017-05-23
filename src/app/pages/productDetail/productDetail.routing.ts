import {RouterModule, Routes} from "@angular/router";
import {ProductDetail} from "./productDetail.component";


const routes: Routes = [
  {
    path: '',
    component: ProductDetail
  }
];

export const routing = RouterModule.forChild(routes);
