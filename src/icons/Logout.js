import React from 'react';
import SVGIconContainer from '@/icons/SVGIconContainer';

const Logout = function LogoutIcon(props) {
  return (
    <SVGIconContainer
      {...props}
      height={18}
      width={24}
      color="#999da3"
    >
      <path
        d="M20.5 705h3.937c.31 0 .563.253.563.562v1.125c0 .31-.254.563-.563.563H20.5c-1.242 0-2.25 1.008-2.25 2.25v9c0 1.241 1.008 2.25 2.25 2.25h3.937c.31 0 .563.252.563.562v1.125c0 .309-.254.562-.563.562H20.5c-2.484 0-4.5-2.015-4.5-4.5v-9c0-2.483 2.016-4.499 4.5-4.499zm10.832.914l-.919.919c-.225.225-.22.586.01.801l5.301 5.147H24.062c-.31 0-.562.253-.562.562v1.313c0 .31.253.562.562.562h11.662l-5.301 5.142c-.225.22-.23.581-.01.802l.92.918c.22.22.576.22.796 0l7.706-7.687c.22-.22.22-.576 0-.797l-7.706-7.687c-.22-.215-.577-.215-.797.005z"
        transform="translate(-16 -705)"
      />
    </SVGIconContainer>
  );
};

export default Logout;
