/* eslint-disable import/prefer-default-export */
import {
  curveLinear,
  curveCardinal,
  curveCatmullRom,
  curveMonotoneX,
} from 'd3-shape';

export const mapCurve = {
  linear: curveLinear,
  cardinal: curveCardinal,
  catmullRom: curveCatmullRom,
  monotoneX: curveMonotoneX,
};
