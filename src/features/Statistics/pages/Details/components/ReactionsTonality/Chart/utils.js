import React from 'react';
import { Tooltip } from '@/components/charts';

export const getRows = (item, keys, colors) => {
  if (keys.length) {
    return keys?.map((key, i) => (
      <Tooltip.Row
        key={key || i}
        value={item[key]}
        color={colors[key]}
      />
    ));
  }

  return Object.values(colors)?.map((color) => (
    <Tooltip.Row
      key={color}
      value="Нет данных"
      color={color}
    />
  ));
};

export default {
  getRows,
};
