import {Component, Injectable, OnInit} from "@angular/core";
import {ProductOptionsTableService} from "./productOptionsTable.service";
import {ServerDataSource} from "ng2-smart-table";
import {Router} from "@angular/router";
import {HttpService} from "../http/HttpService";
import {environment} from "../../../environments/environment";
import ProductOption = ProductOptionModel.ProductOption;


@Component({
  selector: 'productOptionsTable',
  templateUrl: './productOptionsTable.html',
})

@Injectable()
export class ProductOptionsTable implements OnInit {

  poDetail: ProductOption;

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

  constructor(protected service: ProductOptionsTableService,
              private router: Router,
              protected httpService: HttpService) {

  }

  ngOnInit(): void {
    this.source = new ServerDataSource(this.httpService.getHttp(), {
      endPoint: this.httpService.remoteUrl().concat(environment.resourceURL.getProductOptions),
      dataKey: 'content',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      totalKey: 'totalElements'
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onRowSelect(event): void {
    this.poDetail = event.data;
  }

  editRow(event): void {
    this.poDetail = event.data;
    this.router.navigate([environment.pageURL.productOptionDetail, {'id': this.poDetail.id}]);
  }

  addNew(event): void {
    this.poDetail = event.data;
    this.router.navigate([environment.pageURL.productOptionDetail]);
  }
}

