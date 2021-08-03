import React, { useRef } from 'react';
import useScrollDisable from './index';

export default {
  title: 'Hooks/use-scroll-disable',
  argTypes: {
    preventDisable: { control: 'boolean' },
  },
};

export const Default = ({ preventDisable }) => {
  useScrollDisable(preventDisable);

  return (
    <div
      style={{
        background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
        height: '200vh',
        width: '100%',
      }}
    />
  );
};
Default.args = {
  preventDisable: false,
};

export const WithRef = ({ preventDisable }) => {
  const ref = useRef();

  useScrollDisable(preventDisable, ref);

  return (
    <div
      ref={ref}
      style={{
        height: '20rem',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
          height: '200vh',
          width: '100%',
        }}
      />
    </div>
  );
};
WithRef.args = {
  preventDisable: false,
};
