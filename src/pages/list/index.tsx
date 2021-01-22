import React from 'react';
import Carousel from './components/Carousel';
import { TopStory, Story, getStories } from 'services/list';
import './index.scss';

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
      <div style={{ overflow: 'hidden' }}>
        <div>
          <Carousel autoPlay>
            {topStories.map((item) => (
              <div key={item.id} style={{ position: 'relative' }}>
                <div className="overlay" />
                <img style={{ width: '100%', height: '100%' }} src={item.image} alt="" />
                <div className="banner">
                  <div className="banner-title">{item.title}</div>
                  <div className="banner-hint">{item.hint}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
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
