import VkPromotedPost from './components/VkPromotedPost';
import VkStory from './components/VkStory';
import FbPromotedPost from './components/FbPromotedPost';

export const platformsAdsTypes = {
  vk: {
    promotedPost: VkPromotedPost,
    story: VkStory,
  },
  fb: {
    promotedPost: FbPromotedPost,
  },
};

export default {
  platformsAdsTypes,
};
