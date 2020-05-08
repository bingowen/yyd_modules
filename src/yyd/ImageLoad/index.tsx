import React, { Fragment, useState, useRef } from 'react';
import TweenOne from 'rc-tween-one';
import { Spin } from '@/yyd_modules';

interface ImageLoadProps {
  imgSrc: string;
  className?: string;
}



const ImageLoad: React.FC<ImageLoadProps> = props => {
  const { imgSrc, className } = props;
  const imgLoadData = {};

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [anim, setAnim] = useState<any>(null);
  // setIsLoad(imgLoadData[imgSrc]);

  const onImageLoad = () => {
    if (!imgLoadData[imgSrc] || !isLoad) {
      setIsLoad(true);
      imgLoadData[imgSrc] = true;
    }
  };


  const onEnter = () => {
    setAnim([
      {
        backgroundPositionY: '100%',
        duration: 4000,
      },
      { backgroundPositionY: '0%', duration: 4000 },
    ]);
  };

  const onLeave = () => {
    setAnim({ backgroundPositionY: '0%' });
  }
  const enter = Array.isArray(anim);

  return (
    <Spin spinning={!isLoad}>
      <TweenOne
        repeat={enter ? -1 : 0}
        animation={anim}
        className={className || 'img'}
        style={{ backgroundImage: `url(${imgSrc})` }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      />
      <img alt="img" src={imgSrc} onLoad={onImageLoad} style={{ display: 'none' }} />
    </Spin>

  );
};

export default ImageLoad;
