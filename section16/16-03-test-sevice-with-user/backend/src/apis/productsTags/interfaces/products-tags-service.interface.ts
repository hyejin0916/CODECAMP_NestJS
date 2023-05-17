export interface IProductsTagsServicefindByNames {
  tagNames: string[];
}

export interface IProductsTagsServiceBulkInsert {
  names: {
    name: string;
  }[];
}
