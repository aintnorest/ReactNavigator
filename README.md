#Redux Navigator
Is a router for react & redux loosely based off the React-Native Navigator. It uses react-motion for the animations and supports x,y, & opacity transformation at the moment.

I never liked the api for react-router and didn't like the animation story behind it. I wanted something api wise, like the react-native navigator. So I began initially building a router using react-tween-state but quickly switched to react-motion when i realized how much simpler the TransitionMotion would make the router. The biggest change in the api came when a client gave us mock ups for a card based design that required the cards to change their current position depending on the current route / state of the application.

The current state of the navigator is largely a product of what was needed and what we could get to work quickly. I'd like to use the current state as a jumping off point to fix some of the edge cases we've come across as well a place to take a look at re-useability and performance.

This repo is a just a minimal skeleton with the navigator and a few empty components to show how its used...

## Usage
The repo and the examples there are the simplest example of usage.

Starting with the store / reducers. I made the navigator reducer a function that takes a namespace and a initialState. This is to allow you to create / nest several navigators. The requirement to nest navigators is why it currently doesn't use a transform3d as ie10 & ie11 have known issues with nesting transfor3d.

The reducer is pretty much the documentation of the api.
[NAV_PUSH]
    Pushes the current state on to the history then takes the new current state it's given sets it as current.
[NAV_POP]
    Pops the last item off the history and sets it as current.
[NAV_REPLACE]
    Takes the new current state and sets it to current. Without adding anything to history.
[NAV_REPLACE_AT_INDEX]
    Takes an index and a new current. Sets the new current as current then takes a slice of the history at the index given and sets that as the new history. I've consistently found this function to get me into trouble and the following to be my savor.
[NAV_SET_ROUTE_STACK]
    Takes a history and a new current and sets them to the history and current.


a current route might look like the following:

current: {
    backdrop:  {x: 0, y: 0, z: 1, opacity: 100},
    cardThree: {x: 2, y: 0, z: 2, opacity: 100},
    cardTwo:   {x: 24, y: 0, z: 2, opacity: 100},
    cardOne:   {x: 46, y: 0, z: 2, opacity: 100},
    header:    {x: 0, y: 0, z: 5, opacity: 100},
},

each key is a specific page or route object the total of which make up the page itself, the object itself is a representation of what you want the base state to be. the renderer will use the enter and leave values from the definition and then animate it to what you set here.
If the next current is missing one of the keys it will be animated out if the state object is different the router will animate the change if a new one is in there it will animate it out from the definition.

In this example I call the definitions the sceneConfig and its passed into the navigator when its created. Here is what a definition might look like:


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
}

The VMs are function wrappers that return components where you have access to the store. So that you can pass information in and set store.dispatches etc.. as props instead of giving the components themselves that access. I'd like to get a more in-depth example of the entire usage but I'd also like to play with the api and may wait to solidify it before spending the time to give better examples.

## Requirements:
 - node v4.0.0 -- I recommend nvm.
 - babel -- this could be removed as a dependency.
 - "react": "^0.14.3"
 - "react-dom": "^0.14.1"
 - "react-motion": "^0.3.1"
 - "redux": "^3.0.4"
 - "react-addons-pure-render-mixin": "^0.14.2"

 ## Changes:

I have a lot of thoughts on changes.

A big one is handling data loading and processing. Performance is about having <15ms to get everything done and doing data gathering and processing while the animation is happening is really un-performant. Maybe having a way to put up a loading screen then fire a function with processing and data retreval that takes a done function that can be called when everything is ready then dropping the waiting screen and animating change. In production, right now we throw up a load screen almost everytime we do a data fetch and drop it when the data is available. Along the same lines I wonder if I can stop children from making updates until the animation is done.

I just switched it from caching just the vm to caching the wrap as well and cloning the element with the new styles instead of just recreating the wrap every time and putting the cache in as a child. Im trying it to see if I see a performance increase or not.

The current version in use has a section for debugging and modals I pulled them out for this with the intent that they could be handled through regular navigation but it needs to be evaluated and either added back or figure out what the best way of handling it is.

Using matrix3d transform and opacity would let you change pretty much anything you want in one transform statement. I may use this instead.

right now i just inline transform and WebkitTransform I'd like to setup browser detection and handle which prefixes are necessary.
