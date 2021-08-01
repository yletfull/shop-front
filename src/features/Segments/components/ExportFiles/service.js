import api from '@/api';
import { apiBaseUrl } from '@/features/Segments/constants';

export const downloadSegment = ({
  adsPlatform,
  segmentId,
  conditions,
  fileName,
  entityTypes,
  sampleRowSize,
  splitFilesCount,
}) => {
  if (segmentId) {
    const params = {
      adsPlatform,
      fileName,
      entityTypes: entityTypes.join(','),
      sampleRowSize: sampleRowSize || null,
      splitFilesCount: splitFilesCount || null,
    };
    return api.get(
      `${apiBaseUrl}/segments/${segmentId}/export/`,
      { params },
    );
  }

  const segment = segmentId
    ? { id: segmentId, title: 'export-segment' }
    : {
      conditions: conditions.map((group) => (
        group.map((condition) => ({
          attributeId: condition.id,
          type: condition.equality,
          negation: condition.negation,
          values: condition.values,
          datasetIds: condition.datasetIds,
        }))
      )),
      title: 'export-segment',
    };

  const body = {
    fileName,
    adsPlatform,
    entityTypes,
    segment,
    splitFilesCount: splitFilesCount || 0,
    sampleRowSize: sampleRowSize || 0,
  };

  return api
    .post(
      `${apiBaseUrl}/segments/export/`,
      body,
      {
        responseType: 'blob',
      },
    )
    .then((response) => {
      const href = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/zip' }),
      );

      const link = document.createElement('a');
      link.target = '_blank';
      link.download = `${fileName}.zip`;
      link.href = href;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
};

export default {
  downloadSegment,
};
