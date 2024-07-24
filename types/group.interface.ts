export interface IGroupData {
  id: string;
  name: string;
  faculty: string;
}

export interface IGroupsResponse {
  data: IGroupData[];
  paging: {
    firstItemOnPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    lastItemOnPage: number;
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    totalItemCount: number;
  };
}
