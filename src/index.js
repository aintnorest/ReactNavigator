/* src/index.js */
import configureStore              from 'store';
import { render }                  from 'react-dom';
import Navigator                   from 'components/Navigator';
import React                       from 'react';
//
//
const store  = configureStore(window.__INITIAL_STATE__, __DEBUG__);
//
setTimeout(()=>{
    store.dispatch({type:'NAV_PUSH_BASE',payload:{
        current: {
            backdrop:      {x: 0, y: 0, z: 1, opacity: 100},
            cardOne:       {x: 2, y: 0, z: 2, opacity: 100},
            cardTwo:       {x: 24, y: 0, z: 2, opacity: 100}
        },
    }});
},2000);
//
setTimeout(()=>{
    store.dispatch({type:'NAV_PUSH_BASE',payload:{
        current: {
            backdrop:      {x: 0, y: 0, z: 1, opacity: 100},
            cardOne:       {x: 46, y: 0, z: 2, opacity: 100},
            cardThree:     {x: 24, y: 0, z: 2, opacity: 100},
        },
    }});
},4000);
//
setTimeout(()=>{
    store.dispatch({type:'NAV_PUSH_BASE',payload:{
        current: {
            backdrop:      {x: 0, y: 0, z: 1, opacity: 100},
            cardOne:       {x: 2, y: 0, z: 2, opacity: 100},
            cardTwo:       {x: 24, y: 0, z: 2, opacity: 100},
            cardThree:     {x: 46, y: 0, z: 2, opacity: 100},
        },
    }});
},7000);
//
setTimeout(()=>{
    store.dispatch({type:'NAV_PUSH_BASE',payload:{
        current: {
            backdrop:      {x: 0, y: 0, z: 1, opacity: 100},
            cardThree:       {x: 2, y: 0, z: 2, opacity: 100},
            cardTwo:       {x: 24, y: 0, z: 2, opacity: 100},
            cardOne:     {x: 46, y: 0, z: 2, opacity: 100},
        },
    }});
},10000);
//
setTimeout(()=>{
    store.dispatch({type:'NAV_POP_BASE'});
},12000);
setTimeout(()=>{
    store.dispatch({type:'NAV_POP_BASE'});
},14000);
setTimeout(()=>{
    store.dispatch({type:'NAV_POP_BASE'});
},16000);
//
render(
    <Navigator
        store={store}
        listener={ (nav)=> {
            store.subscribe(function() { nav(store.getState().navigator); });
        }}
        initialState={store.getState().navigator}
        sceneConfigurations={require("constants/sceneConfig")}
    />,
    document.getElementById('root'));
//
