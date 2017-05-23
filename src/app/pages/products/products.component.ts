import {Component, Injectable, OnInit} from "@angular/core";
import {ServerDataSource} from "ng2-smart-table";
import {Router} from "@angular/router";
import {HttpService} from "../http/HttpService";
import {ProductService} from "./products.service";
import {environment} from "../../../environments/environment";
import Product = ProductModel.Product;


@Component({
  selector: 'products',
  templateUrl: './products.html',
})

@Injectable()
export class Products implements OnInit {

  private product: Product;

  settings = {
    mode: 'external', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    actions: {
      add: true,
      edit: true
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },

    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      manufacturer: {
        title: 'Manufacturer',
        type: 'string'
      },
    },
    pager: {
      perPage: 10
    }
  };

  source: ServerDataSource;

  constructor(protected service: ProductService,
              private router: Router,
              protected httpService: HttpService) {

  }

  ngOnInit(): void {
    this.source = new ServerDataSource(this.httpService.getHttp(), {
      endPoint: this.httpService.remoteUrl().concat(environment.resourceURL.getProducts),
      //dataKey: 'content',`
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      totalKey: 'totalElements'
    });
  }

  onProductDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onPoductRowSelect(event): void {
    this.product = event.data;
  }

  editPoduct(event): void {
    this.product = event.data;
    this.router.navigate([environment.pageURL.productDetail, {'id': this.product.id}]);
  }

  addProduct(event): void {
    this.product = event.data;
    this.router.navigate([environment.pageURL.productDetail]);
  }
}

