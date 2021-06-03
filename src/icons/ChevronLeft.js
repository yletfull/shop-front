import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const ChevronLeft = function IconChevronLeft(props) {
  return (
    <SVGIconContainer
      {...props}
      height={512}
      width={256}
    >
      <path d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" />
    </SVGIconContainer>
  );
};

export default ChevronLeft;