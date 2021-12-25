import axios, { AxiosInstance } from "axios";

export interface Page<T> {
  count: number,
  next: string | null,
  previous: string | null
  results: T
}

export interface LegoThemeResponse {
  id: number,
  name: string,
  parent_id: number | null,
}

export type LegoThemesResponse = Page<LegoThemeResponse>

export interface LegoSetResponse {
  set_num: string,
  name: string,
  year: number,
  theme_id: number,
  num_parts: number,
  set_img_url: string,
  set_url: string,
  last_modified_dt: string 
}

export type LegoSetsResponse = Page<LegoSetResponse>

export async function getAllPages<T>(
  axios: AxiosInstance, 
  path: string, 
  params: any = {}, 
  page: number = 1, 
  results: T[] = []): Promise<T[]> {

  const {data} = await axios.get<Page<T>>(path, {
    params: { ...params, page }
  });
  
  return await data.next ? 
               getAllPages(axios, path, params, ++page, results.concat(data.results)) : 
               results.concat(data.results);
}

const ENDPOINT = 'https://rebrickable.com';
const AUTH_KEY = process.env.REACT_APP_AUTH_KEY ?? '';

export const rebrickable = axios.create({
  baseURL: ENDPOINT,
  timeout: 5000,
  headers: {'Authorization': `key ${AUTH_KEY}`}
}); 
