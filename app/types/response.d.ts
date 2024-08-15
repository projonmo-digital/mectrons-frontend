export interface IpaginatedRespoinseEluquent<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: null | string;
    next: null | string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface IpaginatedRespoinse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: null | string;
  last_page: number;
  last_page_url: string;
  links: {
    url: null | string;
    label: string;
    active: boolean;
  }[];
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: null | string;
  total: number;
}
