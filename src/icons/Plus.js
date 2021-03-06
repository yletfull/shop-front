/* eslint-disable max-len */
import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const Plus = function PlusIcon(props) {
  return (
    <SVGIconContainer
      {...props}
      height={512}
      width={384}
    >
      <path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" />
    </SVGIconContainer>
  );
};

export default Plus;
