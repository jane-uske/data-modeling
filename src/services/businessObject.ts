import { request } from '@umijs/max';

export async function querybusinessObjectList(
  params: {
    // // query
    // /** keyword */
    // keyword?: string;
    // /** current */
    // current?: number;
    // /** pageSize */
    // pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/businessObject/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function querybusinessObjectListWithPagination(
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
  return request<API.Result_PageInfo_UserInfo__>('/businessObject/page', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateBusinessObject(
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
  return request<API.Result_PageInfo_UserInfo__>(
    '/businessObject/saveOrUpdate',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
