import { request } from '@umijs/max';

interface Response {
  msg: string;
  data: any;
  code: number;
}

export async function querySubjectDomain(
  params: {
    department?: string;
    id?: number;
    name?: string;
    parentId?: number;
    remark?: string;
    type?: 0 | 1;
    pageNumber?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/subjectDomain/flow/tree',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

export async function deleteSubjectDomain(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/subjectDomain/delete',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

export async function updateSubjectDomain(
  params: {
    id?: number;
    parentId?: number;
    name: string;
    remark?: string;
    type?: 0 | 1;
    department?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/subjectDomain/saveOrUpdate',
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
