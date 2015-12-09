import { createReducer } from 'utils';

export default function createNavigationReducer(namespace, initState) {
    // need to export these from a file in constants
    const NAV_PUSH = 'NAV_PUSH'+namespace;
    const NAV_POP = 'NAV_POP'+namespace;
    const NAV_REPLACE = 'NAV_REPLACE'+namespace;
    const NAV_REPLACE_AT_INDEX = 'NAV_REPLACE_AT_INDEX'+namespace;
    const NAV_SET_ROUTE_STACK = 'NAV_SET_ROUTE_STACK'+namespace;

    const initialState = (initState) ? initState : {
        current: {
            backdrop:      {x: 0, y: 0, z: 1, opacity: 100}
        },
        history: [],
    };

    return createReducer(initialState, {
        [NAV_PUSH] : (state, action) => {
            const newState = {...state};
            newState.history.push(state.current);
            newState.current = action.current;
            return newState;
        },
        [NAV_POP] : (state, action) => {
            if(state.history.length === 0) return state;
            const newState = {...state};
            newState.current = newState.history.pop();
            return newState;
        },
        [NAV_REPLACE] : (state, action) => {
            const newState = {...state};
            newState.current = action.current;
            return newState;
        },
        [NAV_REPLACE_AT_INDEX] : (state, action) => {
            const newState = {...state};
            newState.history = state.history.slice(0, action.index);
            newState.current = action.current;
            return newState;
        },
        [NAV_SET_ROUTE_STACK] : (state, action) => {
            const newState = {...state};
            newState.history = action.history;
            newState.current = action.current;
            return newState;
        },
    });
}
