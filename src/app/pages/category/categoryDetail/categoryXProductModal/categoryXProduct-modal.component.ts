import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ServerDataSource} from "ng2-smart-table";
import {CategoryDetailService} from "../categoryDetail.service";
import {Product} from "../../../productDetail/Product";
import {HttpService} from "../../../http/HttpService";
import {CategoryXProduct} from "../categoryXProduct";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'add-categoryXProduct-modal',
  templateUrl: './categoryXProduct-modal.component.html',
  providers: [CategoryDetailService],
})


export class CategoryXProductModal implements OnInit {


  categoryXProductModalSettings = {
    mode: 'external', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    actions: {
      add: false,
      edit: false,
      delete: false,
      actions: false,
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
      url: {
        title: 'URL',
        type: 'string'
      }
    },
    pager: {
      perPage: 10
    }
  };

  categoryXProductSource: ServerDataSource;
  categoryXProduct: CategoryXProduct;
  displayOrderCXP: number;
  productCXP: string;

  constructor(protected service: CategoryDetailService,
              protected http: HttpService,
              private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.categoryXProductSource = new ServerDataSource(this.http.getHttp(), {
      endPoint: this.http.remoteUrl().concat(environment.resourceURL.getProducts),
      //dataKey: 'content',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      //totalKey: 'totalElements'
    });
  }

  onCategoryXProductRowSelect(event): void {
    let product: Product = event.data;
    this.categoryXProduct = {
      id: null,
      defaultReference: false,
      displayOrder: this.displayOrderCXP,
      category: null,
      product: product.name,
      categoryId: null,
      productId: product.id
    }
    this.productCXP = product.name;
  }

  closeCategoryXProductModal() {
    this.categoryXProduct ? this.categoryXProduct.displayOrder = this.displayOrderCXP : null;
    this.activeModal.close(this.categoryXProduct);
  }

  dismissCategoryXProductModal() {
    this.activeModal.dismiss("No Product added to category");
  }
}
