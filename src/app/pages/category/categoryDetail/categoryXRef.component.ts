import {Component, Input, OnInit} from "@angular/core";
import {FormArray, FormGroup} from "@angular/forms";
import {LocalDataSource} from "ng2-smart-table";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryXRefModal} from "./categoryXRefModal/categoryXRef-modal.component";

@Component({
  selector: 'categoryXRef',
  templateUrl: './categoryXRef.html',
  entryComponents: []
})

export class CategoryXRef implements OnInit {

  @Input("categoryDetailForm")
  public categoryDetailForm: FormGroup;

  @Input("categoryXRefSource")
  public categoryXRefSource: LocalDataSource;

  categoryXRefSettings = {
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
      subCategory: {
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

  constructor(private categoryXRefModal: NgbModal) {

  }

  ngOnInit(): void {
  }

  addCategoryXRef(event): void {

    let modalRef = this.categoryXRefModal.open(CategoryXRefModal, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.result.then((res) => {
      res ? this.categoryXRefSource.prepend(res) : null;
    }).catch(err => console.log(err));
  }

  deleteCategoryXRef(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      let val = this.categoryDetailForm.controls['allCategoryXref'].value.filter(el => el !== event.data);
      this.categoryXRefSource.remove(event.data).then(res => {
          const control = <FormArray>this.categoryDetailForm.controls['allCategoryXref'];
          control.patchValue(val);
        }
      )
        .catch(err => console.log(err));
    }
  }
}
