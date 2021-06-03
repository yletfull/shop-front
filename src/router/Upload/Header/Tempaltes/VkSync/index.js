import React from 'react';

import ProcessButton from '@/components/ProcessButton';
import HeaderTemplate from '@/components/HeaderTemplate';
import VkIcon from '@/icons/Vk';

const VkSyncTemplate = function VkSyncTemplateScreen() {
  return (
    <HeaderTemplate>
      <ProcessButton
        icon={<VkIcon />}
        text={['Cинхронизироваться ', 'c ВК']}
        download
      />
    </HeaderTemplate>
  );
};

export default VkSyncTemplate;
