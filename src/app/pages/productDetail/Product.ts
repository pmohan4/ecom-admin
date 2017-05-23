import ProductOption = ProductOptionModel.ProductOption;
import {Sku} from "./Sku";
import {Category} from "../category/categoryDetail/category";

export class Product {

  id: number;

  name: string;

  archived: boolean;

  canSellWithoutOptions: boolean;

  description: string;

  isFeaturedProduct: boolean;

  manufacture: string;

  model: string;

  overrideGeneratedUrl: boolean;

  url: string;

  urlKey: string;

  defaultCategoryId: number;

  defaultSkuId: number;

  productOptions: Array<ProductOption>;

  productCategories: Array<Category>;

  skus: Array<Sku>;

  defaultSku: Sku;

  defaultCategory: Category;

  constructor() {
    this.productOptions = [];
  }
}

