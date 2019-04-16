import { applyMiddleware, createStore } from "redux";
import LoggerCreator from "redux-logger";

const Logger = LoggerCreator();
const initState = {
    value: 0,
    test: {
        name: 'f'
    },
};

const createStoreEnhancer = applyMiddleware(Logger)(createStore);
// const actionCreater = (list) => {
//     const actions = {};
//     list.forEach(item => {

//         const actionFn = (...args) => (
//             { type, payload:...agrs }
//         )
//         actions[actionName] = actionFn;
//     });
//     return actions;
// }

// actionCreater({
//     type:'ADD'
// });
// actionCreater({
//     type:'DECREASE'
// });

const action = {};
action.add = (payload) => ({ type: "ADD", payload })
action.decrease = (payload) => ({ type: "DECREASE", payload })


const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, value: state.value + action.payload };
        case 'DECREASE':
            return { ...state, value: state.value - action.payload };

        default:
            return state;
    }

}
const store = createStoreEnhancer(
    reducer
);
// OR
const BindDispatch = {};
BindDispatch.add = (value) => (store.dispatch(action.add(1)))

export { action, reducer, store }