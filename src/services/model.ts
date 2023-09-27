import { request } from '@umijs/max';

export async function queryModelPage(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/model/page', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateModel(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/model/saveOrUpdate', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function statisticsModel(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/model/statistics', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
