import React from 'react';
import SVGIconContainer from '@/icons/SVGIconContainer';

const ChevronDown = function ChevronDownIcon(props) {
  return (
    <SVGIconContainer
      {...props}
      height={448}
      width={512}
    >
      <path d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z" />
    </SVGIconContainer>
  );
};

export default ChevronDown;
