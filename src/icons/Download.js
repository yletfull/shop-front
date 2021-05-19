import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const Download = function DownloadIcon(props) {
  return (
    <SVGIconContainer
      {...props}
      height={24}
      width={27}
    >
      <g
        fillRule="nonzero"
      >
        <path
          d="M172.75 150.5h-4.317l2.16-2.16c1.412-1.412.413-3.84-1.588-3.84h-3v-5.25c0-1.242-1.008-2.25-2.25-2.25h-4.5c-1.243 0-2.25 1.008-2.25 2.25v5.25h-3c-1.997 0-3.01 2.423-1.59 3.84l2.162 2.16h-4.327c-1.242 0-2.25 1.008-2.25 2.25v6c0 1.242 1.008 2.25 2.25 2.25h22.5c1.242 0 2.25-1.008 2.25-2.25v-6c0-1.242-1.008-2.25-2.25-2.25zM154 146.75h5.25v-7.5h4.5v7.5H169l-7.5 7.5-7.5-7.5zm18.75 12h-22.5v-6h6.567l3.09 3.09c.88.88 2.3.876 3.182 0l3.09-3.09h6.571v6zm-4.125-3c0-.623.502-1.125 1.125-1.125s1.125.502 1.125 1.125-.502 1.125-1.125 1.125-1.125-.502-1.125-1.125z"
          transform="translate(-148 -137)"
        />
      </g>
    </SVGIconContainer>
  );
};

export default Download;
