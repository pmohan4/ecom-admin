import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      {
        path: 'categoryList',
        loadChildren: 'app/pages/category/categoryList.module#CategoryListModule'
      },
      {
        path: 'categoryDetail',
        loadChildren: 'app/pages/category/categoryDetail/categoryDetail.module#CategoryDetailModule'
      },
      {
        path: 'products',
        loadChildren: 'app/pages/products/products.module#ProductsModule'
      },
      {
        path: 'productDetail',
        loadChildren: 'app/pages/productDetail/productDetail.module#ProductDetailModule'
      },
      {
        path: 'productOptionsTable',
        loadChildren: 'app/pages/productOptionsTable/productOptionsTable.module#ProductOptionsTableModule'
      },
      {
        path: 'productOptionDetail',
        loadChildren: 'app/pages/productOptionDetail/productOptionDetail.module#ProductOptionDetailModule'
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
