export interface Group {
  id: string;
  name: string;
  faculty: string;
}

export interface GroupsResponse {
  data: Group[];
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
