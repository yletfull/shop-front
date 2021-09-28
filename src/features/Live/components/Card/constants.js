import VkPromotedPost from './components/VkPromotedPost';
import VkStory from './components/VkStory';
import FbPromotedPost from './components/FbPromotedPost';
import FbStory from './components/FbStory';

export const platformsAdsTypes = {
  vk: {
    promotedPost: VkPromotedPost,
    story: VkStory,
  },
  fb: {
    promotedPost: FbPromotedPost,
    story: FbStory,
  },
};

export default {
  platformsAdsTypes,
};
