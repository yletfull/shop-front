import React, { useState } from 'react';
import SortButton from './index';

export default {
  title: 'Components/SortButton',
  component: SortButton,
};

const Template = (args) => <SortButton {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  children: 'Показатель',
  field: 'index',
  sortField: 'index',
  sortDir: 'asc',
};

export const Dynamic = () => {
  const [sortDir, setSortDir] = useState('asc');
  const [sortField, setSortField] = useState('name');
  const handleSortChange = (fields) => {
    setSortDir(fields.sortDir);
    setSortField(fields.sortField);
  };

  return (
    <div>
      <SortButton
        field="name"
        sortField={sortField}
        sortDir={sortDir}
        onChange={handleSortChange}
      >
        Название
      </SortButton>
      {' '}
      <SortButton
        field="impressions"
        sortField={sortField}
        sortDir={sortDir}
        onChange={handleSortChange}
      >
        Показы
      </SortButton>
      {' '}
      <SortButton
        field="clicks"
        defaultSortDir="desc"
        sortField={sortField}
        sortDir={sortDir}
        onChange={handleSortChange}
      >
        Клики
      </SortButton>
      {' '}
      <SortButton
        field="ctr"
        sortField={sortField}
        sortDir={sortDir}
        onChange={handleSortChange}
      >
        CTR
      </SortButton>
    </div>
  );
};
