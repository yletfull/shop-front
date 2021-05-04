export const globalStages = {
  firstUpload: 'firstUpload',
  errorCheck: 'errorCheck',
  loadImage: 'loadImage',
  finalUpload: 'finalUpload',
};

export const firstUploadStages = {
  selectAccount: `${globalStages.firstUpload}/selectAccount`,
  filseIsNotLoaded: `${globalStages.firstUpload}/filseIsNotLoaded`,
  selectList: `${globalStages.firstUpload}/selectList`,
  fileIsLoading: `${globalStages.firstUpload}/fileIsLoading`,
};

export const finalUploadStages = {
  fileIsLoading: `${globalStages.finalUpload}/fileIsLoading`,
  fileIsLoaded: `${globalStages.finalUpload}/fileIsLoaded`,
};
