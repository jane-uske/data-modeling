import { request } from '@umijs/max';

export async function updateModelHis(
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
  return request<API.Result_PageInfo_UserInfo__>('/modelHis/saveOrUpdate', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
