import VkPromotedPost from './components/VkPromotedPost';
import VkStory from './components/VkStory';
import FbPromotedPost from './components/FbPromotedPost';
import FbStory from './components/FbStory';

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
    promotedPost: 10,
    story: 10,
  },
  fb: {
    promotedPost: 10,
    story: 10,
  },
};

export default {
  platformsAdsComponents,
  platformsAdsSizes,
};
