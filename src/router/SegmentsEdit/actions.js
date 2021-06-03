import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import { getSegment } from './selectors';
import service from './service';

export const requestParams = createAction(`${NS}/params/request`);
export const updateParams = createAction(`${NS}/params/update`);

export const requestSegment = createAction(`${NS}/segment/request`);
export const updateSegment = createAction(`${NS}/segment/update`);

export const fetchParams = () => async (dispatch) => {
  dispatch(requestParams());
  try {
    const { groups } = await service.fetchParams();
    dispatch(updateParams(groups));
  } catch (error) {
    console.error(error);
    dispatch(updateParams([]));
  }
};
export const fetchSegment = (id) => async (dispatch) => {
  dispatch(requestSegment());
  try {
    const response = await service.fetchSegment(id);
    dispatch(updateSegment(response));
  } catch (error) {
    console.error(error);
    dispatch(updateSegment([]));
  }
};
export const addSegmentParam = (params) => (dispatch, getState) => {
  const segment = getSegment(getState());
  dispatch(updateSegment(segment.concat(params.map((p) => [p]))));
};
export const removeSegmentAttribute = (position) => (dispatch, getState) => {
  const segment = getSegment(getState());
  const [groupIndex, attributeIndex] = position;
  const attribute = segment[groupIndex];
  if (!attribute) {
    return;
  }
  const newAttribute = [
    ...attribute.slice(0, attributeIndex),
    ...attribute.slice(attributeIndex + 1),
  ];
  dispatch(updateSegment([
    ...segment.slice(0, groupIndex),
    newAttribute,
    ...segment.slice(groupIndex + 1),
  ].filter((a) => a.length > 0)));
};
export const moveSegmentAttribute = (source, target) => (
  (dispatch, getState) => {
    const [sourceGroupIndex, sourceAttributeIndex] = source || [];
    const [targetGroupIndex, targetAttributeIndex = 0] = target || [];
    if ([
      sourceGroupIndex,
      targetGroupIndex,
      targetAttributeIndex,
    ].some((index) => typeof index === 'undefined')) {
      return;
    }
    const segment = getSegment(getState());
    dispatch(updateSegment(segment
      .reduce((acc, attributes, index) => {
        if (index === sourceGroupIndex) {
          const newSourceAttributes = [
            ...attributes.slice(0, sourceAttributeIndex),
            ...attributes.slice(sourceAttributeIndex + 1),
          ];
          return [...acc, newSourceAttributes];
        }

        if (index === targetGroupIndex) {
          const newTargetAttributes = [
            ...attributes,
            segment[sourceGroupIndex][sourceAttributeIndex],
          ];
          return [...acc, newTargetAttributes];
        }

        return [...acc, attributes];
      }, [])
      .filter((attributes) => attributes.length > 0)));
  });
export const insertSegmentAttribute = (position, source) => (
  (dispatch, getState) => {
    const [sourceGroupIndex, sourceAttributeIndex] = source || [];
    if (!position
      || !['top', 'bottom'].includes(position)
      || typeof sourceGroupIndex === 'undefined'
      || typeof sourceAttributeIndex === 'undefined') {
      return;
    }
    const segment = getSegment(getState());
    const sourceAttribute = segment[sourceGroupIndex][sourceAttributeIndex];
    const newSourceAttributes = [
      ...segment[sourceGroupIndex].slice(0, sourceAttributeIndex),
      ...segment[sourceGroupIndex].slice(sourceAttributeIndex + 1),
    ];
    dispatch(updateSegment([
      ...(position === 'top'
        ? [[sourceAttribute]]
        : []),
      ...segment.slice(0, sourceGroupIndex),
      newSourceAttributes,
      ...segment.slice(sourceGroupIndex + 1),
      ...(position === 'bottom'
        ? [[sourceAttribute]]
        : []),
    ].filter((attributes) => attributes.length > 0)));
  });
