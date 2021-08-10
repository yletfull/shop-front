import { equalities } from '../../constants';
import {
  getRandomString,
  checkHasOptions,
} from '../../utils';

let nextClientId = 0;
const getClientId = () => {
  nextClientId += 1;

  return `${getRandomString()}-${nextClientId}`;
};

const append = function appendConditionUtil(conditions, newAttributes) {
  const newConditions = newAttributes.map((attribute) => ([
    {
      ...attribute,
      equality: checkHasOptions(attribute.options)
        ? equalities.in
        : equalities.eq,
      negation: false,
      values: [],
      datasetIds: [],
      clientId: getClientId(),
    },
  ]));

  return [
    ...conditions,
    ...newConditions,
  ];
};

const move = function moveConditionUtil(conditions, path) {
  const { target, source } = path;
  const [sourceGroup, sourceIndex] = source;
  const [targetGroup, targetIndex] = target;

  const condition = conditions[sourceGroup][sourceIndex];

  if (!condition) {
    return conditions;
  }

  const updatedGroups = conditions.map((group, groupIndex) => {
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
  return movedGroups
    .map((group) => group.filter(Boolean))
    .filter((group) => group.length > 0);
};

const patch = function patchConditionUtil(conditions, path, changes) {
  const [groupIndex, index] = path;

  const condition = conditions[groupIndex][index];

  if (!condition) {
    return conditions;
  }

  return [
    ...conditions.slice(0, groupIndex),
    [
      ...conditions[groupIndex].slice(0, index),
      { ...conditions[groupIndex][index], ...changes },
      ...conditions[groupIndex].slice(index + 1),
    ],
    ...conditions.slice(groupIndex + 1),
  ];
};

const remove = function removeConditionUtil(conditions, path) {
  const [atGroup, atIndex] = path;

  return conditions
    .map((group, groupIndex) => (
      group.filter((_, index) => (
        !(groupIndex === atGroup && index === atIndex)
      ))
    ))
    .filter((group) => group.length > 0);
};

const useModel = function useModelHook(value, onChange) {
  const conditions = Array.isArray(value) ? value : [];

  const handleConditionsAppend = (newAttributes) => {
    if (!Array.isArray(newAttributes) || !newAttributes.length) {
      return;
    }

    onChange(
      append(conditions, newAttributes),
      { shouldRequestStatistics: false },
    );
  };

  const handleConditionMove = (target, source) => {
    if (
      (!Array.isArray(source) || source.length < 2)
      || (!Array.isArray(target) || target.length < 2)
    ) {
      return;
    }

    const [sourceGroup] = source || [];
    const [targetGroup, targetIndex] = target || [];
    const movingGroup = [...(conditions[source[0]] || [])];
    const shouldRequestStatistics = (
      (targetGroup !== sourceGroup)
      && !(targetIndex === -1 && movingGroup.length === 1)
    );

    onChange(
      move(conditions, { target, source }),
      { shouldRequestStatistics },
    );
  };

  const handleConditionPatch = (path, changes) => {
    if (!changes || (!Array.isArray(path) || path.length < 2)) {
      return;
    }

    onChange(
      patch(conditions, path, changes),
      { shouldRequestStatistics: true },
    );
  };

  const handleConditionRemove = (path) => {
    if (!Array.isArray(path) || path.length < 2) {
      return;
    }

    onChange(
      remove(conditions, path),
      { shouldRequestStatistics: true },
    );
  };

  return {
    handleConditionsAppend,
    handleConditionPatch,
    handleConditionMove,
    handleConditionRemove,
  };
};

export default useModel;
