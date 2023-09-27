import { request } from '@umijs/max';

export async function querySubjectDomain(
  params: {
    department?: string;
    id?: number;
    name: string;
    parentId: number;
    remark: string;
    type: 0 | 1;
    pageNumber: number;
    pageSize: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/subjectDomain/flow/tree', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function deleteSubjectDomain(
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
  return request<API.Result_PageInfo_UserInfo__>('/subjectDomain/delete', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateSubjectDomain(
  params: {
    department?: string;
    id?: number;
    name: string;
    parentId: number;
    remark: string;
    type: 0 | 1;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(
    '/subjectDomain/saveOrUpdate',
    {
      data: params,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 设置请求头为JSON格式
      },
      ...(options || {}),
    },
  );
}
