import {Component, Inject, OnDestroy, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {RequestMethod, URLSearchParams} from "@angular/http";
import {LocalDataSource} from "ng2-smart-table";
import {Category} from "./category";
import {HttpService} from "../../http/HttpService";
import {CategoryDetailService} from "./categoryDetail.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'categoryDetail',
  templateUrl: './categoryDetail.html',
  entryComponents: []
})

export class CategoryDetail implements OnInit, OnDestroy {

  categoryDetail: Category;
  sub: any;
  id: number;

  @Output("categoryDetailForm")
  public categoryDetailForm: FormGroup;

  @Output("categoryXProductSource")
  public categoryXProductSource: LocalDataSource = new LocalDataSource();

  @Output("categoryXRefSource")
  public categoryXRefSource: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {

      if (params['id'] != null) {
        this.id = +params['id'];
        this.getCategoryDetailForId(this.id);
        this.createForm();
      } else {
        this.createForm();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  constructor(protected service: CategoryDetailService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private httpService: HttpService) {

    this.categoryDetail = {
      id: null,
      activeEndDate: null,
      activeStartDate: null,
      archived: null,
      description: null,
      displayTemplate: null,
      externalId: null,
      fulfillmentType: null,
      inventoryType: "No Value Selected",
      longDescription: null,
      overrideGeneratedUrl: false,
      taxCode: null,
      url: null,
      urlKey: null,
      name: null,
      defaultParentCategory: null,
      allProductXref: [],
      allCategoryXref: []
    };
  }

  createForm() {
    this.categoryDetailForm = this.formBuilder.group({
      id: [this.categoryDetail.id],
      name: [this.categoryDetail.name, Validators.required],
      description: [this.categoryDetail.description, Validators.required],
      overrideGeneratedUrl: [this.categoryDetail.overrideGeneratedUrl],
      parentCategory: [this.categoryDetail.defaultParentCategory ? this.categoryDetail.defaultParentCategory.name : null],
      url: [this.categoryDetail.url],
      activeStartDate: [this.categoryDetail.activeStartDate],
      activeEndDate: [this.categoryDetail.activeEndDate],
      externalId: [this.categoryDetail.externalId],
      allProductXref: [this.categoryDetail.allProductXref],
      displayTemplate: [this.categoryDetail.displayTemplate],
      inventoryType: [this.categoryDetail.inventoryType],
      fulfillmentType: [this.categoryDetail.fulfillmentType],
      allCategoryXref: [this.categoryDetail.allCategoryXref]
    });
    this.categoryXProductSource.load(this.categoryDetail.allProductXref);
    this.categoryXRefSource.load(this.categoryDetail.allCategoryXref);
  }

  onSubmitCategoryDetail(): void {

    this.categoryDetail = this.categoryDetailForm.value;
    this.saveOrUpdateCategoryDetail(this.id ? RequestMethod.Put : RequestMethod.Post);
  }

  private saveOrUpdateCategoryDetail(method: RequestMethod) {

    this.httpService
      .request(environment.resourceURL.updateCategory, this.categoryDetail, method)
      .then(data => {
        this.categoryDetail = <Category>data;
        this.createForm();
      })
      .catch(err => console.log(err));
  }

  private getCategoryDetailForId(id) {

    let params: URLSearchParams = new URLSearchParams;
    params.append("id", id);

    this.httpService
      .getWithParam(environment.resourceURL.getCategoryDetail, params)
      .then(data => {
        this.categoryDetail = <Category>data;
        this.createForm();
      })
      .catch(err => console.log(err));
  }


}
