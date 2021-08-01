import api from '@/api';
import { apiBaseUrl } from '@/features/Segments/constants';
import { mapConditionsForRequest } from '@/features/Segments/utils';

export const downloadSegment = ({
  adsPlatform,
  segmentId,
  conditions,
  fileName,
  entityTypes,
  sampleRowsSize,
  splitFilesCount,
}) => {
  const responseType = 'blob';
  const downloadFileFromResponse = (response) => {
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
  };

  if (segmentId) {
    const params = {
      adsPlatform,
      fileName,
      entityTypes: entityTypes.join(','),
      sampleRowsSize: sampleRowsSize || null,
      splitFilesCount: splitFilesCount || null,
    };
    return api
      .get(
        `${apiBaseUrl}/segments/${segmentId}/export/`,
        { params, responseType },
      )
      .then(downloadFileFromResponse);
  }

  const segment = {
    conditions: mapConditionsForRequest(conditions),
    title: 'export-segment',
  };

  const body = {
    fileName,
    adsPlatform,
    entityTypes,
    segment,
    splitFilesCount: splitFilesCount || 0,
    sampleRowsSize: sampleRowsSize || 0,
  };

  return api
    .post(
      `${apiBaseUrl}/segments/export/`,
      body,
      { responseType },
    )
    .then(downloadFileFromResponse);
};

export default {
  downloadSegment,
};
