import {RouterModule, Routes} from "@angular/router";

import {ProductOptionDetail} from "./productOptionDetail.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProductOptionDetail
  }
];

export const routing = RouterModule.forChild(routes);
