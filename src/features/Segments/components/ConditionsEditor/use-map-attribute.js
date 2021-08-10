import { useMemo } from 'react';

const useMapAttribute = function useMapAttribute(attributesTree) {
  return useMemo(() => attributesTree.reduce((result, group) => ({
    ...result,
    ...group.attributes.reduce((acc, attribute) => ({
      ...acc,
      [attribute.id]: attribute,
    }), {}),
  }), {}), [attributesTree]);
};

export default useMapAttribute;
