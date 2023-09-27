import { request } from '@umijs/max';

// 模型变更记录列表
export async function updateModelHisList(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/modeling/modelHis/list', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

// 保存-修改模型变更记录
export async function saveOrUpdateHisRecord(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>(
    '/modeling/modelHis/saveOrUpdate',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
