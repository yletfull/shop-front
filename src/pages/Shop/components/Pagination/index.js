import React from 'react';
import { observer } from 'mobx-react-lite';
import DeviceStore from '@/store/Devices';
import Pagination from '@/components/Pagination';

const Pages = observer(() => {
  const device = DeviceStore;
  const currentPage = device.page;
  const pageSize = device.limit;
  const pagesCount = Math.ceil(device.totalCount / device.limit);

  const handlePageChange = (page) => device.setPage(page);
  const handlePageCountSelect = (count) => device.setLimit(count);

  return (
    <Pagination
      pageSize={pageSize}
      page={currentPage}
      pagesCount={pagesCount}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageCountSelect}
    />
  );
});

export default Pages;
