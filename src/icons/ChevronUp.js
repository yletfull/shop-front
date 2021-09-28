import React from 'react';
import SVGIconContainer from '@/icons/SVGIconContainer';

const ChevronUp = function ChevronUpIcon(props) {
  return (
    <SVGIconContainer
      {...props}
      height={448}
      width={512}
    >
      <path d="M6.101 359.293L25.9 379.092c4.686 4.686 12.284 4.686 16.971 0L224 198.393l181.13 180.698c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 132.908c-4.686-4.686-12.284-4.686-16.971 0L6.101 342.322c-4.687 4.687-4.687 12.285 0 16.971z" />
    </SVGIconContainer>
  );
};

export default ChevronUp;
