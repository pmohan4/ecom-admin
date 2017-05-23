import {RouterModule, Routes} from "@angular/router";
import {ProductOptionsTable} from "./productOptionsTable.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProductOptionsTable,
  }
];

export const routing = RouterModule.forChild(routes);

