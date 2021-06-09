import { createAction } from '@reduxjs/toolkit';
import { namespace as NS, segmentProps, equalityTypes } from './constants';
import { getSegmentAttributes } from './selectors';
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
    dispatch(updateSegment({}));
  }
};
export const addSegmentAttribute = (values) => (dispatch, getState) => {
  const attributes = getSegmentAttributes(getState());
  const mapAttribute = (attr) => {
    const initial = {
      attributeId: null,
      equality: equalityTypes.any,
      negation: false,
      values: [],
      datasetIds: [],
    };
    return ([{ ...initial, ...attr }]);
  };
  dispatch(updateSegment({
    [segmentProps.attributes]: attributes.concat(values.map(mapAttribute)),
  }));
};
export const removeSegmentAttribute = (position) => (dispatch, getState) => {
  const attributes = getSegmentAttributes(getState());
  const [groupIndex, attributeIndex] = position;
  const attribute = attributes[groupIndex];
  if (!attribute) {
    return;
  }
  const newAttribute = [
    ...attribute.slice(0, attributeIndex),
    ...attribute.slice(attributeIndex + 1),
  ];
  dispatch(updateSegment({
    [segmentProps.attributes]: [
      ...attributes.slice(0, groupIndex),
      newAttribute,
      ...attributes.slice(groupIndex + 1),
    ].filter((a) => a.length > 0),
  }));
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
    const attributes = getSegmentAttributes(getState());
    dispatch(updateSegment({
      [segmentProps.attributes]: attributes
        .reduce((acc, attrs, index) => {
          if (index === sourceGroupIndex) {
            const newSourceAttributes = [
              ...attrs.slice(0, sourceAttributeIndex),
              ...attrs.slice(sourceAttributeIndex + 1),
            ];
            return [...acc, newSourceAttributes];
          }

          if (index === targetGroupIndex) {
            const newTargetAttributes = [
              ...attrs,
              attributes[sourceGroupIndex][sourceAttributeIndex],
            ];
            return [...acc, newTargetAttributes];
          }

          return [...acc, attrs];
        }, [])
        .filter((attrs) => attrs.length > 0),
    }));
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
    const attributes = getSegmentAttributes(getState());
    const sourceAttribute = attributes[sourceGroupIndex][sourceAttributeIndex];
    const newSourceAttributes = [
      ...attributes[sourceGroupIndex].slice(0, sourceAttributeIndex),
      ...attributes[sourceGroupIndex].slice(sourceAttributeIndex + 1),
    ];
    dispatch(updateSegment({
      [segmentProps.attributes]: [
        ...(position === 'top'
          ? [[sourceAttribute]]
          : []),
        ...attributes.slice(0, sourceGroupIndex),
        newSourceAttributes,
        ...attributes.slice(sourceGroupIndex + 1),
        ...(position === 'bottom'
          ? [[sourceAttribute]]
          : []),
      ].filter((attrs) => attrs.length > 0),
    }));
  });
export const updateSegmentAttribute = (position, values) => (
  (dispatch, getState) => {
    const attributes = getSegmentAttributes(getState());
    const [groupIndex, attributeIndex] = position;
    const attribute = attributes[groupIndex][attributeIndex];
    if (!attribute) {
      return;
    }
    dispatch(updateSegment({
      [segmentProps.attributes]: [
        ...attributes.slice(0, groupIndex),
        [
          ...attributes[groupIndex].slice(0, attributeIndex),
          {
            ...attribute,
            ...values,
          },
          ...attributes[groupIndex].slice(attributeIndex + 1),
        ],
        ...attributes.slice(groupIndex + 1),
      ],
    }));
  });
