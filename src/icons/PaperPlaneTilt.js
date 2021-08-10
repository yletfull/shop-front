import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const PaperPlaneTilt = function IconPaperPlaneTilt(props) {
  return (
    <SVGIconContainer
      {...props}
      height={256}
      width={256}
    >
      <rect
        width="256"
        height="256"
        fill="none"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M210.25072,35.878,23.923,88.432a8,8,0,0,0-1.253,14.9295l85.61084,40.5525a8.00008,8.00008,0,0,1,3.80521,3.80521L152.63852,233.33a8,8,0,0,0,14.9295-1.253L220.122,45.74928A8,8,0,0,0,210.25072,35.878Z"
      />
      <line
        x1="110.863"
        x2="156.118"
        y1="145.137"
        y2="99.882"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </SVGIconContainer>
  );
};

export default PaperPlaneTilt;
