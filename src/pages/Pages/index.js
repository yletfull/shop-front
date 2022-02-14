import React from 'react';
import { observer } from 'mobx-react-lite';
import DeviceStore from '@/store/Devices';
import Pagination from '@/components/Pagination';

const Pages = observer(() => {
  const device = DeviceStore;
  const pageSize = device.limit;
  const pagesCount = Math.ceil(device.totalCount / device.limit);

  const handlePageChange = (e, page) => device.setPage(page);
  const handlePageCountSelect = (value) => device.setLimit(value);

  return (
    <Pagination
      pageSize={pageSize}
      pagesCount={pagesCount}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageCountSelect}
    />
  );
});

export default Pages;
