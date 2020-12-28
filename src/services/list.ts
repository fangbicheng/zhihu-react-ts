import request from './request';

export interface TopStory {
  id: number;
  title: string;
  image: string;
  hint: string;
}

export interface Story {
  id: number;
  title: string;
  images: string[];
  hint: string;
}

export interface LastedNews {
  date: string;
  // eslint-disable-next-line camelcase
  top_stories: TopStory[];
  stories: Story[];
}

export const getStories = () => {
  return request.get<LastedNews>('/api/4/news/latest');
};
