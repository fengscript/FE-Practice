import { createStore } from "redux";

const inintState = {
    value: 0
};


const actionCreater = ({type, payload}) => {
    return { type , payload }
}

actionCreater({
    type:'ADD'
});
actionCreater({
    type:'DREASE'
});


const reducer = (state = inintState, action) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, value: state.value + action.payload };
        case 'DREASE':
            return { ...state, value: state.value - action.payload };

        default:
            return state;
    }

}
const store = createStore(reducer);

export { reducer, store }