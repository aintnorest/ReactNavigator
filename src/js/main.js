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
/*
React.render((<Navigator initialScene={initialScene} configureScene={(conf, name) => {

    const result = components[name];
    if (!result) { console.log("Invalid component name", name) }
    return result.render(conf);


}} renderScene={(name, nav) => {

    const result = components[name];
    if (!result) { console.log("Invalid component name", name) }
    return result.display(nav);


}}/>), document.body);
*/
/*
const components = {
    "Backdrop": { render: (c)=>c.Fade(), display: 
        (nav) => {
            return (
                <Backdrop onLogout={()=>{nav.modalOn(components.LogoutModal.display(nav))}}
                    quotePage={() => { nav.push([
                        {name: "Backdrop", state: 1, z:"0" },
                        {name: "SalesQuoteSummary", state: 0, z:"6"},
                        {name: "TSRSheader", state: 0, z:"10"}]) }}
                    mount={(fnc) => {return SectionCompleteEvents.subscribe(fnc)}}  />
            );
        }
    },
    "LogoutModal": { display: (nav)=>(<LogoutModal back={nav.modalOff} yes={()=>{console.log("LOGOUT!!!")}} />)},
    "Menu" : { render: (c)=>c.SlideUp(), display: (nav)=>(<Menu
        rapidResponseRetainer={ (err) => { nav.push([{name:"Backdrop", state:1, z:"0"}, {name:"SRRRgetStarted", state:0, z:"1"}, {name:"Menu",state:0,z:"7"}], null, err) } }
        siteReadyServices={ () => { console.log("Replace With Nav Push") } }
        unitedSecureServices={ (err) => { nav.push([{name:"Backdrop", state:1, z:"0"}, {name:"SUSSgetStarted", state:0, z:"1"}, {name:"Menu",state:0,z:"7"}], null, err) } }
        bussinessConnection={ (err) => { nav.push([{name:"Backdrop", state:1, z:"0"}, {name:"SBCgetStarted", state:0, z:"1"}, {name:"Menu",state:0,z:"7"}], null, err) } } />)
    },

    "TSRSgetStarted": { render: (c)=>c.SlideRight(), display: 
        (nav)=>{
            
            return (
                <ProductCard
                    getStarted={()=>{nav.modalOn(components.OrderNumber.display(nav))}}
                    content={SRS.description}
                    background={"url('./assets/sps_background.png')"}
                    title={SRS.name} />
            ); 
        }
    },

    "SRRRgetStarted": { render: (c)=>c.SlideRight(), display: 
        (nav)=>{
            
            return (
                <ProductCard
                    getStarted={()=>{checkCustomer(nav,[
                        {name: "Backdrop", state: 1, z:"0"},
                        {name: "SRRRheader", state: 0, z:"10"},
                        {name: "SRRRpackageSelectLeft", state:0, z:"5"},
                        {name: "SRRRpackageSelectCenter", state:30.72265625, z:"5"},
                        {name: "SRRRpackageSelectRight", state:61.4453125, z:"5"},
                        {name: "Menu", state:0, z:"7"}

                    ])}}
                    edit={() => { console.log("edit please"); SectionCompleteEvents.onNext({srrr: false})}}
                    mount={(fnc) => {return SectionCompleteEvents.subscribe(fnc)}}
                    content={SRRR.description}
                    section="srrr"
                    background={"url('./assets/rrr_background.png')"}
                    title={SRRR.name} />
            ); 
        }
    },
}

React.render((<Navigator initialScene={initialScene} configureScene={(conf, name) => {

    const result = components[name];
    if (!result) { console.log("Invalid component name", name) }
    return result.render(conf);


}} renderScene={(name, nav) => {

    const result = components[name];
    if (!result) { console.log("Invalid component name", name) }
    return result.display(nav);


}}/>), document.body);
*/
