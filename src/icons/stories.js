import React from 'react';
import ChartLine from './ChartLine';
import TimesLight from './TimesLight';
import AngleDown from './AngleDown';
import ChevronDown from './ChevronDown';
import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import Download from './Download';
import File from './File';
import Finger from './Finger';
import Logo from './Logo';
import Logout from './Logout';
import Pencil from './Pencil';
import PicturesLoad from './PicturesLoad';
import Plus from './Plus';
import Search from './Search';
import Success from './Success';
import Sync from './Sync';
import Times from './Times';
import TimesCircle from './TimesCircle';
import Trash from './Trash';
import Upload from './Upload';
import Users from './Users';
import Vent from './Vent';
import Vk from './Vk';
import Warning from './Warning';
import Analytics from './Analytics';
import ArrowChart from './ArrowChart';
import CaretDown from './CaretDown';
import CaretUp from './CaretUp';
import ExclamationTriangle from './ExclamationTriangle';
import RetweetAlt from './RetweetAlt';
import Rocket from './Rocket';
import ThumbsDown from './ThumbsDown';
import ThumbsUp from './ThumbsUp';

export default {
  title: 'Components/Icons',
  argTypes: {
    color: { control: { type: 'color' } },
    size: { control: { type: 'number' } },
  },
};

const renderIcon = (Component) => (
  <div
    style={{
      border: 'thin solid lightgray',
      borderRadius: '.5rem',
      padding: '.5rem',
      textAlign: 'center',
    }}
  >
    <Component />
    <div style={{ color: '#333', fontSize: '.75em' }}>
      {/* eslint-disable-next-line */}
      {String(Component.name)}
    </div>
  </div>
);

export const Icons = ({ color, size }) => (
  <div
    style={{
      color,
      fontSize: `${size}em`,
      display: 'grid',
      gap: '.5rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(8em, 1fr))',
    }}
  >
    {/* hygen-inject */}
    {renderIcon(ChartLine)}
    {renderIcon(TimesLight)}
    {renderIcon(AngleDown)}
    {renderIcon(ChevronDown)}
    {renderIcon(ChevronLeft)}
    {renderIcon(ChevronRight)}
    {renderIcon(Download)}
    {renderIcon(File)}
    {renderIcon(Finger)}
    {renderIcon(Logo)}
    {renderIcon(Logout)}
    {renderIcon(Pencil)}
    {renderIcon(PicturesLoad)}
    {renderIcon(Plus)}
    {renderIcon(Search)}
    {renderIcon(Success)}
    {renderIcon(Sync)}
    {renderIcon(Times)}
    {renderIcon(TimesCircle)}
    {renderIcon(Trash)}
    {renderIcon(Upload)}
    {renderIcon(Users)}
    {renderIcon(Vent)}
    {renderIcon(Vk)}
    {renderIcon(Warning)}
    {renderIcon(Analytics)}
    {renderIcon(ArrowChart)}
    {renderIcon(CaretDown)}
    {renderIcon(CaretUp)}
    {renderIcon(ExclamationTriangle)}
    {renderIcon(RetweetAlt)}
    {renderIcon(Rocket)}
    {renderIcon(ThumbsDown)}
    {renderIcon(ThumbsUp)}
  </div>
);
Icons.storyName = 'Icons';
Icons.args = {
  color: '#000000',
  size: 1,
};
Icons.parameters = {
  controls: {
    expanded: false,
  },
};
