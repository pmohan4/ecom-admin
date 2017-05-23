import {Component, Input, OnInit} from "@angular/core";
import {FormArray, FormGroup} from "@angular/forms";
import {LocalDataSource} from "ng2-smart-table";
import {CategoryXProductModal} from "./categoryXProductModal/categoryXProduct-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'categoryXProducts',
  templateUrl: './categoryXProducts.html',
  entryComponents: []
})

export class CategoryXProducts implements OnInit {

  @Input("categoryDetailForm")
  public categoryDetailForm: FormGroup;

  @Input("categoryXProductSource")
  public categoryXProductSource: LocalDataSource;

  categoryInventoryTypes: Array<String> = ["No Value Selected", "Always Available", "Check Quantity", "Unavailable"];

  categoryXProductSettings = {
    mode: 'external', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    actions: {
      add: true,
      edit: false,
      delete: true
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
    },

    columns: {
      product: {
        title: 'Name',
        type: 'string',
        editable: false
      },
      displayOrder: {
        title: 'Display Order',
        type: 'number'
      },
    },
    pager: {
      perPage: 10
    }
  };

  constructor(private categoryXProductModal: NgbModal) {

  }

  ngOnInit(): void {

  }

  addCategoryXProduct(event): void {

    let popupModal = this.categoryXProductModal.open(CategoryXProductModal, {
      size: 'lg',
      backdrop: 'static'
    });

    popupModal.result.then((res) => {
      res ? this.categoryXProductSource.prepend(res) : null;
    }).catch(err => console.log(err));
  }

  deleteCategoryXProduct(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      let val = this.categoryDetailForm.controls['allProductXref'].value.filter(el => el !== event.data);
      this.categoryXProductSource.remove(event.data).then(res => {
          const control = <FormArray>this.categoryDetailForm.controls['allProductXref'];
          control.patchValue(val);
        }
      )
        .catch(err => console.log(err));
    }
  }
}
