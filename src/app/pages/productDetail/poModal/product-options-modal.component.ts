import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ServerDataSource} from "ng2-smart-table";
import {ProductOptionsTableService} from "../../productOptionsTable/productOptionsTable.service";
import {HttpService} from "../../http/HttpService";
import {Router} from "@angular/router";
import ProductOption = ProductOptionModel.ProductOption;

@Component({
  selector: 'add-service-modal',
  templateUrl: './product-options-modal.component.html',
  providers: [ProductOptionsTableService],
})

export class ProductOptionModal implements OnInit {


  settings = {
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
      attributeName: {
        title: 'Attribute Name',
        type: 'string'
      },
      optionType: {
        title: 'Option Type',
        type: 'string'
      },
      required: {
        title: 'Required',
        type: 'boolean'
      }
    },
    pager: {
      perPage: 10
    }
  };

  source: ServerDataSource;
  productOption: ProductOption;

  constructor(protected service: ProductOptionsTableService,
              private router: Router, protected http: HttpService,
              private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.source = new ServerDataSource(this.http.getHttp(), {
      endPoint: this.http.remoteUrl().concat('admin/productOption/page'),
      dataKey: 'content',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      totalKey: 'totalElements'
    });
  }

  onRowSelect(event): void {
    console.log(event.data);
    this.productOption = event.data;
    console.log(this.productOption);
  }

  closeModal() {
    this.activeModal.close(this.productOption);
  }
}
