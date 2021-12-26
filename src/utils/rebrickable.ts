/**
 * This file includes type definitions and auxiliary functions for Rebricable API.
 * 
 * Unfortunately Rebricable OpenAPI definitions doesn't include responses.
 * Hence we can't autogenerate good code for REST API.
 * https://rebrickable.com/api/v3/swagger/?format=openapi
 * 
 */
import axios, { AxiosInstance } from "axios";

/**
 * page - Lists are automatically paginated, and currently use a page size of 1000 (might change in the future). 
 * By default, it will only return results for the first page of items. 
 * You can request additional pages with the 'page' parameter (base 1). 
 * Alternatively, there is always a 'next' and 'previous' field in the results which contains the URL for the next 
 * and previous page of results.
 */
export interface Page<T> {
  count: number,
  next: string | null,
  previous: string | null,
  results: T
}

/**
 * path: /api/v3/lego/themes/{id}/
 */
export interface LegoThemesRead {
  id: number,
  name: string,
  parent_id: number | null,
}

/**
 * path: /api/v3/lego/themes/
 */
export type LegoThemesList = Page<LegoThemesRead>

/**
 * path: /api/v3/lego/sets/{set_num}/
 */
export interface LegoSetsRead {
  set_num: string,
  name: string,
  year: number,
  theme_id: number,
  num_parts: number,
  set_img_url: string,
  set_url: string,
  last_modified_dt: string 
}

/**
 * path: /api/v3/lego/sets/
 */
export type LegoSetsList = Page<LegoSetsRead>

/**
 * Fetch all pages sequentially
 * 
 * Note: Implemented recursively. TCO in JS would make my heart soften.
 * But there is no signs there will be a consesus any time soon.
 * Anyway, we not going to hit max recursion limit here? right? 
 * 
 * @param axios axious instance
 * @param path path of a list
 * @param params URL parameters
 * @param page start page
 * @param results accumulator of a recursive calls
 * @returns promise of all pages
 */
export async function getAllPages<T>(
    axios: AxiosInstance, 
    path: string, 
    params: any = {}, 
    page: number = 1, 
    results: T[] = []
  ): Promise<T[]> {

  const {data} = await axios.get<Page<T>>(path, {
    params: { ...params, page }
  });
  
  return await data.next ? 
               getAllPages(axios, path, params, ++page, results.concat(data.results)) : 
               results.concat(data.results);
}

/**
 * Export rebricable axios instance with authorization
 */
const ENDPOINT = 'https://rebrickable.com';
const AUTH_KEY = process.env.REACT_APP_AUTH_KEY ?? '';

export const rebrickable = axios.create({
  baseURL: ENDPOINT,
  timeout: 5000,
  headers: {'Authorization': `key ${AUTH_KEY}`}
}); 
