export interface PaginatedResponse<Resource> {
  data: Resource[];
  pagination: {
    count: number;
    current_page: number;
    links: string[];
    per_page: number;
    total: number;
    total_pages: number;
  };
}
