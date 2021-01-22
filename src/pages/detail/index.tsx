import React from 'react';
import { Detail, getDetail } from 'services/detail';

import './index.scss';

interface State {
  detail: Detail;
}

export default class DailyDetail extends React.PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      detail: { id: 0, title: '', image: '', body: '' },
    };
  }

  async componentDidMount() {
    getDetail(9732162).then((res) => {
      this.setState({
        detail: res.data,
      });
    });
  }

  render() {
    const { detail } = this.state;
    return (
      <div className="container">
        <div className="container-img">
          <img src={detail.image} alt="" />
          <div className="container-img-mask" />
          <h2>{detail.title}</h2>
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div className="container-answer" dangerouslySetInnerHTML={{ __html: detail.body }} />
      </div>
    );
  }
}
