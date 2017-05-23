import {RouterModule, Routes} from "@angular/router";
import {Products} from "./products.component";

const routes: Routes = [
  {
    path: '',
    component: Products,
  }
];

export const routing = RouterModule.forChild(routes);

