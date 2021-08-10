import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const WarningOctagon = function IconWarningOctagon(props) {
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
      <line
        x1="128"
        x2="128"
        y1="80"
        y2="136"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="16"
        d="M164.45079,32H91.54921a8,8,0,0,0-5.65686,2.34315l-51.5492,51.5492A8,8,0,0,0,32,91.54921v72.90158a8,8,0,0,0,2.34315,5.65686l51.5492,51.5492A8,8,0,0,0,91.54921,224h72.90158a8,8,0,0,0,5.65686-2.34315l51.5492-51.5492A8,8,0,0,0,224,164.45079V91.54921a8,8,0,0,0-2.34315-5.65686l-51.5492-51.5492A8,8,0,0,0,164.45079,32Z"
      />
      <circle
        cx="128"
        cy="172"
        r="12"
      />
    </SVGIconContainer>
  );
};

export default WarningOctagon;
