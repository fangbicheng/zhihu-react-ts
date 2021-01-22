import React, { cloneElement } from 'react';

interface Props {
  height?: number;
  animationDuration?: number;
  autoPlay?: boolean;
  autoPlayIntervalTime?: number;
  onSlideStart?: () => void;
  onSlideMove?: () => void;
  onSlideEnd?: () => void;
}

export default class Carousel extends React.PureComponent<Props, any> {
  static defaultProps = {
    height: 200,
    animationDuration: 200,
    autoPlay: false,
    autoPlayIntervalTime: 3000,
  };

  private carousel: any;

  private startX = 0;

  private currentX = 0;

  private offsetX = 0;

  private translateX = 0;

  private activeIndex = 0;

  private slideInterval?: number;

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.slideTo(this.activeIndex, false);
    this.startAutoPlay();
  }

  componentWillUnmount() {
    clearInterval(this.slideInterval);
  }

  onTouchStart = (e: any) => {
    this.startX = e.touches[0].pageX;
    this.pauseAutoPlay();
  };

  onTouchMove = (e: any) => {
    this.currentX = e.touches[0].pageX;
    this.offsetX = this.currentX - this.startX;
    this.doTransform(this.translateX + this.offsetX);
  };

  onTouchEnd = () => {
    const action = this.offsetX > 0 ? 'prev' : 'next';
    const activeIndex = action === 'next' ? this.activeIndex + 1 : this.activeIndex - 1;
    this.slideTo(activeIndex, true);
    this.startAutoPlay();
  };

  onTransitionEnd = () => {
    const { children } = this.props;
    const maxLength = children && (children as any).length;
    const index = this.activeIndex;
    if (index > maxLength - 1) {
      this.activeIndex = 0;
      this.slideTo(this.activeIndex, false);
    } else if (index < 0) {
      this.activeIndex = maxLength - 1;
      this.slideTo(this.activeIndex, false);
    }
  };

  doTransition = (duration?: number) => {
    this.carousel.style.transition = `${duration}ms`;
  };

  doTransform = (offsetX: number) => {
    this.carousel.style.transform = `translate3d(${offsetX}px, 0, 0)`;
  };

  /**
   * 滑动到特定位置
   */
  slideTo = (index: number, isTransition: boolean) => {
    const { animationDuration } = this.props;
    this.activeIndex = index;
    this.translateX = -this.carousel.offsetWidth * (this.activeIndex + 1);
    if (isTransition) {
      this.doTransition(animationDuration);
    } else {
      this.doTransition(0);
    }
    this.doTransform(this.translateX);
  };

  /**
   * 滑动到前一项
   */
  prev = () => {
    this.slideTo(this.activeIndex - 1, true);
  };

  /**
   * 滑动到后一项
   */
  next = () => {
    this.slideTo(this.activeIndex + 1, true);
  };

  /**
   * 开始自动轮播
   */
  startAutoPlay = () => {
    const { autoPlay, autoPlayIntervalTime } = this.props;
    if (!autoPlay) return;

    this.slideInterval = setInterval(() => {
      this.next();
    }, autoPlayIntervalTime);
  };

  /**
   * 暂停自动轮播
   */
  pauseAutoPlay = () => {
    clearInterval(this.slideInterval);
  };

  /**
   * 初始化内容，前后各复制一项，当滑动到复制项上时，快速滑动到该项对应项上，实现无缝轮播
   */
  initItems = () => {
    const { children } = this.props;
    if ((children as any).length === 0) return null;

    const items = [].concat(children as any);
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    items.push(firstItem);
    items.unshift(lastItem);

    // 节点追加后重排key
    const newItems = React.Children.map(items, (element: any, index) => {
      return cloneElement(element, {
        key: index,
        style: Object.assign(element.props.style || {}, { display: 'inline-block', width: '100%', height: '100%' }),
      });
    });
    return newItems;
  };

  render() {
    const { height } = this.props;
    const items = this.initItems();
    return (
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{ height, whiteSpace: 'nowrap' }}
          ref={(e) => {
            this.carousel = e;
          }}
          onTouchStart={(e) => this.onTouchStart(e)}
          onTouchMove={(e) => this.onTouchMove(e)}
          onTouchEnd={this.onTouchEnd}
          onTransitionEnd={this.onTransitionEnd}
        >
          {items}
        </div>
      </div>
    );
  }
}
