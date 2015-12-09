import { combineReducers } from 'redux';
//
import navigator           from './navigator';


export default combineReducers({
    navigator: navigator("_BASE"),
    
});
