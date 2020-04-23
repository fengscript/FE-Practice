import _ from "lodash";
export default {
  cloneDeep: _.cloneDeep,
  debounce: _.debounce,
  throttle: _.throttle,
  size: _.size,
  pick: _.pick,
  isEmpty: _.isEmpty,
  getRandom: (min, max) => Math.round(Math.random() * (max - min)) + min,
};
