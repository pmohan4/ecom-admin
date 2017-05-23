export const environment = {
  production: true,

  resourceURL: {
    apiEndpoint: 'http://live:9090/ecom/',

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
