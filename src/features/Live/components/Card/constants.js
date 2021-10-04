import { devices } from '../../constants';
import VkPromotedPost from './components/VkPromotedPost';
import VkStory from './components/VkStory';
import FbPromotedPost from './components/FbPromotedPost';
import FbStory from './components/FbStory';

const { mobile, desktop } = devices;

export const platformsAdsComponents = {
  vk: {
    promotedPost: VkPromotedPost,
    story: VkStory,
  },
  fb: {
    promotedPost: FbPromotedPost,
    story: FbStory,
  },
};

export const platformsAdsSizes = {
  vk: {
    promotedPost: {
      [mobile]: {
        width: '23.5rem',
      },
      [desktop]: {
        width: '34.375rem',
      },
    },
    story: {
      [mobile]: {
        width: '16.875rem',
      },
      [desktop]: {
        width: '16.875rem',
      },
    },
  },
  fb: {
    promotedPost: {
      [mobile]: {
        width: '23.5rem',
      },
      [desktop]: {
        width: '42.5rem',
      },
    },
    story: {
      [mobile]: {
        width: '16.875rem',
      },
      [desktop]: {
        width: '16.875rem',
      },
    },
  },
};

export default {
  platformsAdsComponents,
  platformsAdsSizes,
};
