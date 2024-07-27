export interface IGroupData {
  id: string;
  name: string;
  faculty: string;
}

export interface IGroupsResponse {
  data: IGroupData[];
  paging: {
    pageCount: number;
    totalItemCount: number;
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    firstItemOnPage: number;
    lastItemOnPage: number;
  };
}
