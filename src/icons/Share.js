import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const Share = function IconShare(props) {
  return (
    <SVGIconContainer
      {...props}
      height={64}
      width={64}
    >
      <path d="M6.54,55.08a1.91,1.91,0,0,1-.62-.1,2,2,0,0,1-1.38-2c0-.3,2.06-29.34,31.18-31.62V10.92a2,2,0,0,1,3.43-1.4L58.89,29.68a2,2,0,0,1,0,2.8L39.15,52.64a2,2,0,0,1-3.43-1.4V41C16.28,41.74,8.31,54,8.23,54.15A2,2,0,0,1,6.54,55.08ZM39.72,15.82v7.41a2,2,0,0,1-1.93,2c-18.84.69-25.58,13.24-28,21.31,5-4.32,13.91-9.6,27.81-9.6h.09a2,2,0,0,1,2,2v7.41l15-15.26Z" />
    </SVGIconContainer>
  );
};

export default Share;
