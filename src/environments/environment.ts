// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  resourceURL: {
    apiEndpoint: 'http://localhost:9090/ecom/',

    getCategories: 'admin/category/page',
    getCategoryDetail: 'admin/category/detail',
    updateCategory:'admin/category',

    getProducts:'product/all',
    getProductById:'product/id/',
    updateProduct:'product',

    getProductOptions:'product/options',
    getProductOptionById:'product/option/id/',
    updateProductOption:'product/option',
  },

  pageURL: {
    categoryDetail: '/pages/categoryDetail',
    productOptionDetail:'/pages/productOptionDetail',
    productDetail:'/pages/productDetail',
  }
};
