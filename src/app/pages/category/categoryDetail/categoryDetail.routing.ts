import {RouterModule, Routes} from "@angular/router";
import {CategoryDetail} from "./categoryDetail.component";


const routes: Routes = [
  {
    path: '',
    component: CategoryDetail
  }
];

export const routing = RouterModule.forChild(routes);
