import { request } from '@umijs/max';

interface Response {
  msg: string;
  code: number;

  data: any;
}

// 全量业务对象
export async function querybusinessObjectList(
  params: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/businessObject/list',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

// 分页业务对象
export async function querybusinessObjectListWithPagination(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/businessObject/page',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

// 更新业务对象
export async function updateBusinessObject(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/businessObject/saveOrUpdate',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

// 删除业务对象
export async function deleteBusinessObject(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/businessObject/delete',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

// 删除业务对象
export async function checkCodeBusinessObject(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/businessObject/checkCode',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
