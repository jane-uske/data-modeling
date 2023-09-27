import { request } from '@umijs/max';

interface Response {
  msg: string;
  code: number;

  data: any;
}

// 列表请求
export async function queryModelList(
  params: {
    pageNumber: number;
    pageSize: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/model/page',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

// 保存更新
export async function saveOrUpdateModel(
  params: {
    type: 0 | 1 | 2;
    subjectDomainId: number;
    name: string;
    maxNum: number;
    remark?: string;
    canvasJson?: 'string';
    id?: 0;
    businessObjectList?: {
      code: 'string';
      name: 'string';
      modelId: 0;
      subjectDomainId: 0;
      id?: 0;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/model/saveOrUpdate',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

// 获取count
export async function getStatisticsModel(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/model/statistics',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

// 模型详情
export async function getModelDetail(
  params: { id: string },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__ & Response>(
    '/modeling/model/detail',
    {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
