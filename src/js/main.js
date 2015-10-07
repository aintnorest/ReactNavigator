import React from "react/addons"
import {Motion, TransitionMotion, presets, spring, utils} from 'react-motion';
//
const initialScene = {a:{state: 1, z: 1}, b:{state: 20, z: 1}, c:{state: 1, z: 1}};
//
const Navigator = require("./navigator/Navigator")({ React, TransitionMotion, spring });


const Test = require("./components/Test")({ React });
const testOne = (<Test key="1" top="0" background="blue" content="TESTER 1" />);
const testTwo = (<Test key="2" top="50" background="green" content="TESTER 2" />);
const testThree = (<Test key="3" top="100" background="purple" content="TESTER 3" />);

const sceneConfigurations = {
    a: {
        Enter: {
            opacity: spring(0),
            zIndex: 1,
        },
        Leave: {
            opacity: spring(0),
            zIndex: 1,
        },
        Styles(val) {
            return { opacity: spring(val.state), zIndex: val.z };
        },
        Element() {
            return testOne;
        }
    },   
    b: {
        Enter: {
            x: spring(-100),
            zIndex: 2,
        },
        Leave: {
            x: spring(-100),
            zIndex: 2,
        },
        Styles(val) {
            return { x: spring(val.state), zIndex: val.z };
        },
        Element() {
            return testTwo;
        }
    },
    c: {
        Enter: {
            opacity: spring(0),
            zIndex: 3,
        },
        Leave: {
            opacity: spring(0),
            zIndex: 3,
        },
        Styles(val) {
            return { opacity: spring(val.state), zIndex: val.z };
        },
        Element() {
            return testThree;
        }
    }
};
//
React.render(<Navigator sceneConfigurations={sceneConfigurations} initialScene={initialScene} />,document.body);
