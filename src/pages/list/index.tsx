import React from 'react';
import { TopStory, Story, getStories } from 'services/list';
import './index.css';

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
        {stories.map((item) => (
          <div className="container" key={item.id}>
            <div className="title-container">
              <div className="title">{item.title}</div>
              <div className="hint">{item.hint}</div>
            </div>
            <img className="image" src={item.images[0]} alt="" />
          </div>
        ))}
        <div className="test" />
      </div>
    );
  }
}
