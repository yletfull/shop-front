import { createReducer } from '@reduxjs/toolkit';
import {
  equalities,
} from '../constants';
import {
  getRandomString,
  checkHasOptions,
} from '../utils';
import {
  attributesRequest,
  attributesData,
  attributesError,
  appendConditions,
  moveCondition,
  patchCondition,
  removeCondition,
} from './actions';
import NS from './ns';

const initialState = {
  attributes: {
    isFetching: false,
    tree: [],
    error: null,
  },
  conditions: [],
  statistics: {
    isFetching: false,
    data: [],
    error: null,
  },
};

const reducer = createReducer(initialState, {
  [attributesRequest]: (state) => ({
    ...state,
    attributes: {
      isFetching: true,
      tree: [],
      error: null,
    },
  }),
  [attributesData]: (state, action) => ({
    ...state,
    attributes: {
      isFetching: false,
      tree: Array.isArray(action.payload) ? action.payload : [],
      error: null,
    },
  }),
  [attributesError]: (state, action) => ({
    ...state,
    attributes: {
      isFetching: false,
      tree: [],
      error: action.payload,
    },
  }),
  [appendConditions]: (state, action) => {
    if (!Array.isArray(action.payload) || action.payload.length < 1) {
      return state;
    }

    const newConditions = action.payload.map((attribute) => ([
      {
        ...attribute,
        equality: checkHasOptions(attribute.options)
          ? equalities.in
          : equalities.eq,
        negation: false,
        values: [],
        datasetIds: [],
        clientId: getRandomString(),
      },
    ]));

    return {
      ...state,
      conditions: [
        ...state.conditions,
        ...newConditions,
      ],
    };
  },
  [moveCondition]: (state, action) => {
    const { source, target } = action.payload || {};

    if (
      (!Array.isArray(source) || source.length < 2)
      || (!Array.isArray(target) || target.length < 2)
    ) {
      return state;
    }

    const [sourceGroup, sourceIndex] = source;
    const [targetGroup, targetIndex] = target;

    const condition = state.conditions[sourceGroup][sourceIndex];

    if (!condition) {
      return state;
    }

    const updatedGroups = state.conditions.map((group, groupIndex) => {
      if (groupIndex === sourceGroup) {
        // remove condition from its source group
        return [
          ...group.slice(0, sourceIndex),
          null,
          ...group.slice(sourceIndex + 1),
        ];
      }

      return group;
    });
    const movedGroups = targetIndex === -1
      // insert new group at index
      ? ([
        ...updatedGroups.slice(0, targetGroup),
        [condition],
        ...updatedGroups.slice(targetGroup),
      ])
      // merge condition into existing group
      : updatedGroups.map((group, groupIndex) => {
        if (groupIndex === targetGroup) {
          return [
            ...group.slice(0, targetIndex),
            condition,
            ...group.slice(targetIndex),
          ];
        }

        return group;
      });
    const filteredGroups = movedGroups
      .map((group) => group.filter(Boolean))
      .filter((group) => group.length > 0);

    return {
      ...state,
      conditions: filteredGroups,
    };
  },
  [patchCondition]: (state, action) => {
    const { position, changes } = action.payload || {};

    if (
      !changes
      || (!Array.isArray(position) || position.length < 2)
    ) {
      return state;
    }

    const [groupIndex, index] = position;

    const condition = state.conditions[groupIndex][index];

    if (!condition) {
      return state;
    }

    return {
      ...state,
      conditions: [
        ...state.conditions.slice(0, groupIndex),
        [
          ...state.conditions[groupIndex].slice(0, index),
          { ...state.conditions[groupIndex][index], ...changes },
          ...state.conditions[groupIndex].slice(index + 1),
        ],
        ...state.conditions.slice(groupIndex + 1),
      ],
    };
  },
  [removeCondition]: (state, action) => {
    if (!Array.isArray(action.payload) || action.payload.length < 2) {
      return state;
    }

    const [atGroup, atIndex] = action.payload;

    return {
      ...state,
      conditions: state.conditions
        .map((group, groupIndex) => (
          group.filter((_, index) => (
            !(groupIndex === atGroup && index === atIndex)
          ))
        ))
        .filter((group) => group.length > 0),
    };
  },
});

reducer.NS = NS;

export default reducer;
