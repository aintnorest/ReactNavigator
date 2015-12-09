
export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    if (typeof(action) === 'undefined') {
        console.error('Invalid action in utils/index');
        return;
    }

    return reducer ? reducer(state, action.payload) : state;
  };
}

export function bindListener(listener,action) {
    let prevState = {};
    return listener(newState => {
        if(prevState === newState) return;
        prevState = newState;
        action(newState);
    });
}
