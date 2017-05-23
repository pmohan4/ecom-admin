import {CategoryXProduct} from "./categoryXProduct";
import {CategoryXRefModel} from "./categoryXRef";

export class Category {

  id: number;

  activeEndDate: Date;

  activeStartDate: Date;

  archived: boolean;

  description: string;

  displayTemplate: string;

  externalId: string;

  fulfillmentType: string;

  inventoryType: string;

  longDescription: string;

  overrideGeneratedUrl: boolean;

  taxCode: string;

  url: string;

  urlKey: string;

  name: string;

  defaultParentCategory: Category;

  allProductXref: Array<CategoryXProduct>;

  allCategoryXref: Array<CategoryXRefModel>;
}
