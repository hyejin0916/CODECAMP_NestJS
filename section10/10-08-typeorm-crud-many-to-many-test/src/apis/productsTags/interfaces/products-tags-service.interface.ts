export interface IProductsTagsServiceFindByName {
  tagNames: string[];
}

export interface IProductsTagsServiceBulkInsert {
  names: {
    name: string;
  }[];
}
