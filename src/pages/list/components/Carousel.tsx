import React from 'react';

export default class Carousel extends React.PureComponent<any, any> {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div
        onTouchStart={() => {
          console.log('onTouchStart');
        }}
      />
    );
  }
}
