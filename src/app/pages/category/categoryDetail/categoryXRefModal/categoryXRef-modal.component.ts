import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ServerDataSource} from "ng2-smart-table";
import {CategoryDetailService} from "../categoryDetail.service";
import {HttpService} from "../../../http/HttpService";
import {CategoryXRefModel} from "../categoryXRef";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'add-categoryXRef-modal',
  templateUrl: './categoryXRef-modal.component.html',
  providers: [CategoryDetailService],
})

export class CategoryXRefModal implements OnInit {


  categoryXRefModalSettings = {
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
      }
    },
    pager: {
      perPage: 10
    }
  };

  categoryXRefSource: ServerDataSource;
  categoryXRef: CategoryXRefModel;
  displayOrderCXR: number;
  subCategoryCXR: string;

  constructor(protected service: CategoryDetailService,
              protected http: HttpService,
              private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.categoryXRefSource = new ServerDataSource(this.http.getHttp(), {
      endPoint: this.http.remoteUrl().concat(environment.resourceURL.getCategories),
      dataKey: 'content',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      totalKey: 'totalElements'
    });
  }

  onCategoryXRefRowSelect(event): void {
    let category = event.data;
    this.categoryXRef = {
      id: null,
      defaultReference: false,
      displayOrder: this.displayOrderCXR,
      category: null,
      subCategory: category.name,
      categoryId: null,
      subCategoryId: category.id
    }
    this.subCategoryCXR = category.name;
  }

  closeCategoryXRefModal() {
    this.categoryXRef ? this.categoryXRef.displayOrder = this.displayOrderCXR : null;
    this.activeModal.close(this.categoryXRef);
  }

  dismissCategoryXRefModal() {
    this.activeModal.dismiss("No Child category added to category");
  }
}
