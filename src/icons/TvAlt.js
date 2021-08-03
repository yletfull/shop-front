import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const TvAlt = function IconTvAlt(props) {
  return (
    <SVGIconContainer
      {...props}
      height={512}
      width={640}
    >
      <path d="M528 464H112a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zM592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h544a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm0 368H48V48h544z" />
    </SVGIconContainer>
  );
};

export default TvAlt;
