import { spring } from 'react-motion';

export default {
    backdrop: {
        Enter: { x: 0, y: 0, z: 1, opacity:spring(0, [40, 40]) },
        Leave: { x: 0, y: 0, z: 1, opacity:spring(0, [40, 40]) },
        Styles(val) {
            return { x: spring(val.x), y: spring(val.y), z: -10, opacity: spring(val.opacity)};
        },
        VM(store) {
            return require("vms/backdrop")(store);
        }
    },
    cardOne: {
        Enter: {x: spring(-100,[300,20]), y: 0, z: 2, opacity: 100},
        Leave: {x: spring(-90,[300,20]), y: 0, z: 2, opacity: 100},
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 2, opacity: val.opacity};
        },
        VM(store) {
            return require("vms/Cards")(store,1);
        }
    },
    cardTwo: {
        Enter: {x: spring(-100,[300,20]), y: 0, z: 2, opacity: 100},
        Leave: {x: spring(-90,[300,20]), y: 0, z: 2, opacity: 100},
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 2, opacity: val.opacity};
        },
        VM(store) {
            return require("vms/Cards")(store,2);
        }
    },
    cardThree: {
        Enter: {x: spring(-100,[300,20]), y: 0, z: 2, opacity: 100},
        Leave: {x: spring(-90,[300,20]), y: 0, z: 2, opacity: 100},
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 2, opacity: val.opacity};
        },
        VM(store) {
            return require("vms/Cards")(store,3);
        }
    },
};
