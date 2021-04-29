export const globalStages = {
  firstUpload: 'firstUpload',
  errorCheck: 'errorCheck',
  loadImage: 'loadImage',
  finalUpload: 'finalUpload',
};

export const firstUploadStages = {
  filseIsNotLoaded: `${globalStages.firstUpload}/filseIsNotLoaded`,
  selectFile: `${globalStages.firstUpload}/selectFile`,
  fileIsLoading: `${globalStages.firstUpload}/fileIsLoading`,
};

export const finalUploadStages = {
  fileIsLoading: `${globalStages.finalUpload}/fileIsLoading`,
  fileIsLoaded: `${globalStages.finalUpload}/fileIsLoaded`,
};
