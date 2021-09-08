import ReactionsFacebook from './components/ReactionsFacebook';
import ReactionsVkontakte from './components/ReactionsVkontakte';
import ReactionsInstagram from './components/ReactionsInstagram';

export const queryParams = {
  dateStart: 'dateStart',
  dateEnd: 'dateEnd',
};

export const colors = {
  tonality: {
    positive: 'hsla(77, 31%, 54%, .7)',
    negative: 'hsla(343, 40%, 65%, .7)',
  },
  commentsAndReposts: {
    comments: 'hsl(210, 7%, 77%)',
    reposts: 'hsl(218, 100%, 33%)',
  },
};

export const platformsData = {
  vk: {
    header: 'Вконтакте',
    id: 'vk',
    Component: ReactionsVkontakte,
  },
  fb: {
    header: 'Facebook',
    id: 'fb',
    Component: ReactionsFacebook,
  },
  ig: {
    header: 'Instagram',
    id: 'ig',
    Component: ReactionsInstagram,
  },
};
