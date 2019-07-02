/**
 * 创建action
 * @param type  action的类型
 * @param actionCreator 需要创建的action,函数
 * @param metaCreator   action的属性
 * @returns {Function}
 */
export default function createAction(type, actionCreator, metaCreator) {
  /**
   * finalActionCreator最终创建的action,
   * 判断传进来的参数是不是function,true返回这个函数,false调用identity函数
   */
  const finalActionCreator =
    typeof actionCreator === "function" ? actionCreator : () => actionCreator;
  /**
   * 返回一个匿名函数
   */
  return (...args) => {
    /**
     *创建的action,只有两个属性
     */
    const action = {
      type,
      payload: finalActionCreator(...args)
    };
    /**
     * 如果给匿名函数传递参数的长度为1个,或者第一个参数元素的类型为Error,那么这么action的error属性为true
     */
    if (args.length === 1 && args[0] instanceof Error) {
      // Handle FSA errors where the payload is an Error object. Set error.
      action.error = true;
    }
    /**
     * 传递到action里面的函数
     */
    if (typeof metaCreator === "function") {
      action.meta = metaCreator(...args);
    }

    return action;
  };
}

const createActions = () => {};
