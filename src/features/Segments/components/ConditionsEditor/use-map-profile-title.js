import { useMemo } from 'react';

const useMapProfileTitle = function useMapProfileTitleHook(attributesTree) {
  return useMemo(() => attributesTree.reduce((acc, group) => {
    try {
      const [{ profileId }] = group.attributes;

      return {
        ...acc,
        [profileId]: group.group,
      };
    } catch (error) {
      console.error(error);
      return acc;
    }
  }, {}), [attributesTree]);
};

export default useMapProfileTitle;
