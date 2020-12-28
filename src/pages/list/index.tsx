import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { TopStory, Story, getStories } from 'services/list';

interface State {
  topStories: TopStory[];
  stories: Story[];
}

export default class List extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      topStories: [],
      stories: [],
    };
  }

  componentDidMount() {
    getStories().then((res) => {
      this.setState({
        topStories: res.data.top_stories,
        stories: res.data.stories,
      });
    });
  }

  render() {
    // eslint-disable-next-line camelcase
    const { topStories, stories } = this.state;

    return (
      <div>
        {topStories.map((item) => (
          <div className="container" key={item.id}>
            <div>{item.title}</div>
            <img src={item.image} alt="" />
          </div>
        ))}
        {stories.map((item) => (
          <div className="container" key={item.id}>
            <div>{item.title}</div>
            <img src={item.images[0]} alt="" />
          </div>
        ))}
      </div>
    );
  }
}
