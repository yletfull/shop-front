import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const Upload = function UploadIcon(props) {
  return (
    <SVGIconContainer
      {...props}
      height={24}
      width={27}
      color="#003daa"
    >
      <g
        fill="#999DA3"
        fillRule="nonzero"
      >
        <path
          d="M734.752 150.5h-6.75V149h3c1.997 0 3.01-2.424 1.589-3.84l-7.5-7.5c-.882-.882-2.303-.877-3.184 0l-7.5 7.5c-1.411 1.41-.408 3.84 1.593 3.84h3v1.5h-6.75c-1.242 0-2.25 1.007-2.25 2.25v6c0 1.242 1.008 2.25 2.25 2.25h22.502c1.242 0 2.25-1.008 2.25-2.25v-6c0-1.243-1.008-2.25-2.25-2.25zM716 146.748l7.501-7.5 7.5 7.5h-5.25v7.5h-4.5v-7.5H716zm18.752 12H712.25v-6H719v1.5c0 1.243 1.009 2.25 2.25 2.25h4.501c1.242 0 2.25-1.007 2.25-2.25v-1.5h6.75v6zm-1.875-3c0 .624-.502 1.126-1.125 1.126-.624 0-1.125-.502-1.125-1.125 0-.624.501-1.125 1.125-1.125.623 0 1.125.501 1.125 1.125z"
          transform="translate(-710 -137)"
        />
      </g>
    </SVGIconContainer>
  );
};

export default Upload;
