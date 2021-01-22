import request from './request';

export interface Detail {
  id: number;
  title: string;
  image: string;
  body: string;
}

export const getDetail = (id: number) => {
  return request.get<Detail>(`/api/4/news/${id}`);
};
