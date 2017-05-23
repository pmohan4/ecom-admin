import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductDetailService} from "./producdDetail.service";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../http/HttpService";
import {Product} from "./Product";
import {Sku} from "./Sku";
import {RequestMethod} from "@angular/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LocalDataSource} from "ng2-smart-table";
import {ProductOptionModal} from "./poModal/product-options-modal.component";
import {Category} from "../category/categoryDetail/category";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'productDetail',
  templateUrl: './productDetail.html',
  entryComponents: [
    ProductOptionModal
  ]
})

export class ProductDetail implements OnInit, OnDestroy {

  productDetail: Product;
  sub: any;
  id: number;
  updatedSku: Sku;
  selectedSku: Sku;


  inventoryTypes: Array<String> = ["No Value Selected", "Always Available", "Check Quantity", "Unavailable"];
  dimensionUnits: Array<String> = ["No Value Selected", "Centimeters", "Feet", "Inches", "Meters"];
  weightUnits: Array<String> = ["No Value Selected", "Kilograms", "Pounds"];

  productOptionsSource: LocalDataSource = new LocalDataSource();
  skuSource: LocalDataSource = new LocalDataSource();

  settings = {
    mode: 'external', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    noDataMessage: "no product options for this product, please add",
    actions: {
      add: true,
      delete: false,
      edit: false
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true,
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

  skuSettings = {
    mode: 'external', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    noDataMessage: "no skus for this product, please add",
    actions: {
      delete: false,
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true,
    },

    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      sellingPrice: {
        title: 'Price',
        type: 'number'
      },
    },
    pager: {
      perPage: 10
    }
  };


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {

      if (params['id'] != null) {
        this.id = +params['id'];
        this.getProductForId(this.id);
        this.createForm();
      } else {
        this.createForm();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  productForm: FormGroup;

  constructor(protected service: ProductDetailService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private httpService: HttpService,
              private poModal: NgbModal) {


    this.productDetail = {
      name: null,
      description: null,
      manufacture: null,
      model: null,
      overrideGeneratedUrl: null,
      urlKey: null,
      url: null,
      defaultCategoryId: null,
      defaultSkuId: null,
      productOptions: [],
      productCategories: null,
      skus: [new Sku()],
      archived: null,
      canSellWithoutOptions: false,
      isFeaturedProduct: false,
      id: null,
      defaultSku: new Sku(),
      defaultCategory: new Category(),
    };
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      name: [this.productDetail.name, Validators.required],
      id: [this.productDetail.id],
      description: [this.productDetail.description, Validators.required],
      manufacture: [this.productDetail.manufacture],
      productOptions: [this.productDetail.productOptions],
      skus: [this.productDetail.skus],
      archived: [this.productDetail.archived],
      isFeaturedProduct: [this.productDetail.isFeaturedProduct],
      overrideGeneratedUrl: [this.productDetail.overrideGeneratedUrl],
      defaultCategoryId: [this.productDetail.defaultCategoryId, Validators.required],
      productOptionsSource: [this.productDetail.productOptions],
      skuSource: [this.productDetail.skus],
      productCategories: [this.productDetail.productCategories],
      defaultSku: this.formBuilder.group({
        id: [this.productDetail.defaultSku.id],
        defaultSkuName: [this.productDetail.defaultSku.name],
        activeStartDate: [this.productDetail.defaultSku.activeStartDate],
        activeEndDate: [this.productDetail.defaultSku.activeEndDate],
        taxableFlag: [this.productDetail.defaultSku.taxableFlag],
        msrPrice: [this.productDetail.defaultSku.msrPrice],
        sellingPrice: [this.productDetail.defaultSku.sellingPrice, Validators.required],
        cost: [this.productDetail.defaultSku.cost, Validators.required],
        discountableFlag: [this.productDetail.defaultSku.discountableFlag],
        inventoryType: [this.productDetail.defaultSku.inventoryType],
        quantityAvailable: [this.productDetail.defaultSku.quantityAvailable],
        depth: [this.productDetail.defaultSku.depth],
        dimensionUnitOfMeasure: [this.productDetail.defaultSku.dimensionUnitOfMeasure],
        girth: [this.productDetail.defaultSku.girth],
        height: [this.productDetail.defaultSku.height],
        width: [this.productDetail.defaultSku.width],
        isMachineSortable: [this.productDetail.defaultSku.isMachineSortable],
        fulfillmentType: [this.productDetail.defaultSku.fulfillmentType],
        weight: [this.productDetail.defaultSku.weight],
        weightUnitOfMeasure: [this.productDetail.defaultSku.weightUnitOfMeasure],
      }),
      defaultCategory: this.formBuilder.group({
        defaultParentCategoryId: [this.productDetail.defaultCategory ? this.productDetail.defaultCategory.id : null],
        defaultCategoryName: [this.productDetail.defaultCategory ? this.productDetail.defaultCategory.name : null],
      }),
    });
    this.productOptionsSource.load(this.productDetail.productOptions);
    this.skuSource.load(this.productDetail.skus);
  }

  onSubmitProduct(): void {

    this.productDetail = this.productForm.value;
    this.saveOrUpdateProduct(RequestMethod.Post);

  }

  private saveOrUpdateProduct(method: RequestMethod) {

    this.httpService
      .request(environment.resourceURL.updateProduct, this.productDetail, method)
      .then(data => {
        this.productDetail = <Product>data;
        this.createForm();
      })
      .catch(err => console.log(err));
  }

  addNewProductOption(event): void {

    let poModel = this.poModal.open(ProductOptionModal, {
      size: 'lg',
      backdrop: 'static'
    });

    poModel.result.then((res) => {
      this.productOptionsSource.prepend(res)
    }).catch(err => console.log(err));
  }

  editNewSku(event): void {
    if (event.data) {
      this.updatedSku = event.data;
      this.selectedSku = event.data;
    }
  }

  addNewSku(): void {
    this.updatedSku = new Sku();
    this.selectedSku = new Sku();
  }

  updateSku() {
    if (!this.updatedSku.id) {
      this.skuSource.prepend(this.updatedSku);
    } else {
      this.skuSource.update(this.selectedSku, this.updatedSku);
    }
  }

  private getProductForId(id) {
    this.httpService
      .get(environment.resourceURL.getProductById + id)
      .then(data => {
        this.productDetail = <Product>data;
        this.createForm();
      })
      .catch(err => console.log(err));
  }


}
