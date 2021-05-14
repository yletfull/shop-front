import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const Times = function TimesIcon(props) {
  return (
    <SVGIconContainer
      {...props}
      height={10}
      width={10}
    >
      <path
        d="M998.895 484l2.843-2.843c.35-.349.35-.914 0-1.264l-.631-.631c-.35-.35-.915-.35-1.264 0L997 482.105l-2.843-2.843c-.349-.35-.914-.35-1.264 0l-.631.631c-.35.35-.35.915 0 1.264l2.843 2.843-2.843 2.843c-.35.349-.35.914 0 1.264l.631.631c.35.35.915.35 1.264 0l2.843-2.843 2.843 2.843c.349.35.915.35 1.264 0l.631-.631c.35-.35.35-.915 0-1.264L998.895 484z"
        transform="translate(-992 -479)"
      />
    </SVGIconContainer>
  );
};

export default Times;
