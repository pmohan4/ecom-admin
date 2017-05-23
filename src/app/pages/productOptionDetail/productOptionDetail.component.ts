import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProductOptionDetailService} from "./productOptionDetail.service";
import {LocalDataSource} from "ng2-smart-table";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../http/HttpService";
import {RequestMethod} from "@angular/http";
import {environment} from "../../../environments/environment";
import ProductOption = ProductOptionModel.ProductOption;

@Component({
  selector: 'productOptionDetail',
  templateUrl: './productOptionDetail.html'
})

export class ProductOptionDetail implements OnInit, OnChanges, OnDestroy {

  id: number;
  private sub: any;
  poDetail: ProductOption;
  validateTypes: string[] = ["None", "No Value Selected", "Validate on Add Item", "Validate on Submit"];
  optionValueSource: LocalDataSource = new LocalDataSource();

  productOptionForm: FormGroup;

  settings = {
    mode: 'inline', // inline|external|click-to-edit
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
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },

    columns: {
      attributeValue: {
        title: 'Attribute Value',
        type: 'string'
      },
      priceAdjustment: {
        title: 'Price Adjustment',
        type: 'number'
      },
      displayOrder: {
        title: 'Display Order',
        type: 'number'
      }
    }
  };

  constructor(protected service: ProductOptionDetailService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private httpService: HttpService) {
    this.poDetail = {
      attributeName: null,
      displayOrder: null,
      errorCode: null,
      errorMessage: null,
      id: null,
      label: null,
      optionType: null,
      productOptionValues: [],
      required: false,
      useInSkuGeneration: false,
      validationStrategyType: null,
      validationString: null,
      validationType: "None",
    };
    this.createForm();
  }

  createForm() {
    this.productOptionForm = this.formBuilder.group({
      attributeName: [this.poDetail.attributeName, Validators.required],
      displayOrder: [this.poDetail.displayOrder, Validators.required],
      errorCode: [this.poDetail.errorCode],
      errorMessage: [this.poDetail.errorMessage],
      id: [this.poDetail.id],
      label: [this.poDetail.label, Validators.required],
      optionType: [this.poDetail.optionType, Validators.required],
      productOptionValues: [this.poDetail.productOptionValues],
      required: [this.poDetail.required],
      useInSkuGeneration: [this.poDetail.useInSkuGeneration],
      validationStrategyType: [this.poDetail.validationStrategyType],
      validationString: [this.poDetail.validationString],
      validationType: [this.poDetail.validationType],
    });
    console.log(this.productOptionForm.controls['productOptionValues'].value)
    this.optionValueSource.load(this.productOptionForm.controls['productOptionValues'].value);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {

      if (params['id'] != null) {
        this.id = +params['id'];
        this.getProductOption(this.id);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      let val = this.productOptionForm.controls['productOptionValues'].value.filter(el => el !== event.data);
      const control = <FormArray>this.productOptionForm.controls['productOptionValues'];
      control.patchValue(val);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  reset(): void {
    this.createForm();
  }

  onSubmitForm(): void {
    this.poDetail = this.productOptionForm.value;
    this.saveOrUpdateProductOption(this.poDetail.id == null ? RequestMethod.Post : RequestMethod.Put);
  }

  private saveOrUpdateProductOption(method: RequestMethod) {
    this.httpService
      .request(environment.resourceURL.updateProductOption, this.poDetail, method)
      .then(data => {
        this.poDetail = <ProductOption>data;
        this.createForm();
      })
      .catch(err => console.log(err));
  }

  private getProductOption(id) {
    this.httpService
      .get(environment.resourceURL.getProductOptionById + id)
      .then(data => {
        this.poDetail = <ProductOption>data;
        this.createForm();
      })
      .catch(err => console.log(err));
  }
}
