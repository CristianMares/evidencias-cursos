// Forma de la respuesta de la API de Giphy (solo lo que usamos).
export interface GiphyResponse {
  data: GiphyItem[];
  pagination: Pagination;
  meta: Meta;
}

export interface GiphyItem {
  id: string;
  title: string;
  images: Images;
}

export interface Images {
  original: Original;
}

export interface Original {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}
