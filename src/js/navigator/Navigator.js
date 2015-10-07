const navigatorFactory = function({ React, TransitionMotion, spring }) {
    //HELPER FUNCTIONS
    function cloneObject(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        const cloneObj = {};
        for (var key in obj) { cloneObj[key] = cloneObject(obj[key]); }
        return cloneObj;
    }
    //
    return React.createClass({
        mixin: [React.addons.PureRenderMixin],
        displayName: "Navigator",
        history: [],  
        getInitialState() { return { elements: {} , loading: 0, modal: (<span />), modalVisible: 0 }; },


        componentDidMount() {
            /*JUST FOR TESTING */
            const nav = this.nav(this);
            nav.push(this.props.initialScene);
            setTimeout(()=>{
                nav.push({a:{state: 1, z: 1}, b:{state: 0, z: 1}, c:{state: 1, z: 1}});
            },5000);
            setTimeout(()=>{
                nav.pop();
            },5100);
        },

        getStyles() {
            let configs = {};
            Object.keys(this.state.elements).forEach(key => {
                configs[key] = this.props.sceneConfigurations[key].Styles(this.state.elements[key]);
            });
            return configs;
        },


    willEnter(key) {
        return this.props.sceneConfigurations[key].Enter;
    },

    willLeave(key, style) {
        return this.props.sceneConfigurations[key].Leave;
    },

    render() {
        return (
          <TransitionMotion
            styles={this.getStyles()}
            willEnter={this.willEnter}
            willLeave={this.willLeave}>
            {interpolatedStyles =>
              <div>
                {Object.keys(interpolatedStyles).map(key => {
                    const {...style} = interpolatedStyles[key];
                    let s;
                    if(style.x !== undefined) {
                        s = {transform: "translateX("+style.x+"vw)", zIndex: style.zIndex};
                    } else if(style.y !== undefined) {
                        s = {transform: "translateY("+style.y+"vh)", zIndex: style.zIndex};
                    } else {
                        s = style;
                    }
                    console.log("NAV RENDER: ",s);
                    return (
                        <div key={key} style={s}>
                            {this.props.sceneConfigurations[key].Element()}
                        </div>
                    );
                })}
                <div style={{opacity:this.state.modalVisible, transition: "opacity .2s ease-in-out", width:"100%", height: "100%", background: "rgba(42,73,91,0.8)", zIndex:(this.state.modalVisible) ? "25" : "-2", position:"absolute", top:"0", left:"0"}}>
                    {this.state.modal}
                </div>
                <div style={{opacity:this.state.loading, transition: "opacity .2s ease-in-out", width:"100%", height: "100%", background: "rgba(42,73,91,0.8)", zIndex:(this.state.loading) ? "30" : "-2", position:"absolute", top:"0", left:"0"}}>
                    <img style={{width:"100px", height:"100px", marginLeft:"462px", marginTop:"250px", marginBottom:"10px"}} src={"./assets/loading.gif"}/>
                    <div style={{fontSize: "25px", textAlign:"center", color:"#F4F4F4"}}>
                        Loading...
                    </div>
                </div>
              </div>
            }
          </TransitionMotion>
        );
    },

    nav: (currContext) => {
        const target = currContext;
        return {
            push(newScene) {
                target.history.push( cloneObject(target.state.elements) );
                target.setState({elements: newScene, modalVisible:0, modal: (<span />) });
            },
            pop() {
                if(target.history.length == 0) return;
                const newScene = target.history.pop();
                target.setState({elements: newScene});
            },
            modalOn(modal) {
                target.setState({modal: modal, modalVisible: 1});
            },
            modalOff() {
                target.setState({modalVisible:0, modal: (<span />) });
            },

            loadingOn() {
                target.setState({loading: 1});
            },
            loadingOff() {
                target.setState({loading: 0});
            },
        };
    },
});
   




}




































/*
const navigatorFactory = function({ React, tweenState }) {
    const this.props.sceneConfigurations = require("./this.props.sceneConfigurations")({ React, tweenState });

    function debounce(count) {
        var i = 0;
        return (func)=> {
            i++;
            if(i === count) func.call(this);
        };
    }

    return React.createClass({
        mixins: [React.addons.PureRenderMixin],
        elementPool: [], toBeCleanedUp: [], toBeAnimatedOut: [], toBeUpdated: [], history: [], newScene: [],

        componentDidMount() {
            this.nav(this).push(this.props.initialScene)
        },
        //
        componentDidUpdate() {
            for(let i = 0; i < this.toBeUpdated.length; i++) {
                this.toBeUpdated[i].ref.updateState(this.toBeUpdated[i].newState);
            }

            const debouncer = debounce(this.toBeAnimatedOut.length);
            for(let i = 0; i < this.toBeAnimatedOut.length; i++) {
                const name = this.toBeAnimatedOut[i].name;
                this.toBeAnimatedOut[i].ref.updateState(0, ()=>{
                    for(let j = this.elementPool.length - 1; j > -1; j--) {
                        if(this.elementPool[j].key === name) {
                            this.elementPool.splice(j,1);
                            break;
                        }
                    }
                    this.forceUpdate();
                })
            }
            this.toBeAnimatedOut = [];
            
        },
        render() { 

            return (
                <div style={{width: "100%", height: "100%"}}>
                    {this.parseScene(this.newScene) }
                </div>
            );
        },
        nav: (currContext) => {
            const target = currContext;
            return {
                push(newScene) {
                    target.history.push(target.newScene);
                    target.newScene = newScene;
                    target.forceUpdate();
                },
                pop() {
                    if(target.history.length == 0) return;
                    const newScene = target.history.pop();
                    console.log("NewScene",newScene);
                    target.newScene = newScene;
                    target.forceUpdate();
                },
            };
        },
        parseScene(newScene) {
            const poolLen = this.elementPool.length;
            const newSceneLen = newScene.length;
            for(let i = 0; i < poolLen; i++) {
                let poolComponentExists = false; 
                for(let j = 0; j < newSceneLen; j++) {
                    if(newScene[j].name === this.elementPool[i].key) {
                        poolComponentExists = true;
                        if(newScene[j].state !== this.refs[this.elementPool[i].ref].state.transitionState) {
                            this.toBeUpdated.push({ref: this.refs[this.elementPool[i].ref], newState: newScene[j].state});
                            for(let k = 0; k < this.toBeCleanedUp.length; k++) {
                                if(this.toBeCleanedUp[k] === newScene[j].name) this.toBeCleanedUp.splice(k,1);
                                break;
                            }
                        }
                    }
                }
                if(!poolComponentExists) {
                    this.toBeAnimatedOut.push({ref: this.refs[this.elementPool[i].ref], name:this.elementPool[i].key});
                    for(let k = 0; k < this.toBeCleanedUp.length; k++) {
                        if(this.toBeCleanedUp[k] === this.elementPool[i].key) this.toBeCleanedUp.splice(k,1);
                        break;
                    }
                }
            }
            //
            for(let j = 0; j < newSceneLen; j++) {
                let newComponentExists = false;
                for(let i = 0; i < poolLen; i++) {
                    if(newScene[j].name === this.elementPool[i].key) {
                        newComponentExists = true;
                        break;
                    }
                }
                if(!newComponentExists) {
                    this.elementPool.push( this.createElement(newScene[j]) );
                }
            }
            //
            return this.elementPool;
        },
        //
        createElement(sceneInfo) {
            let NavWrap;
            if(typeof this.props.configureScene == "function") {
                let response = this.props.configureScene(this.props.sceneConfigurations, sceneInfo.name);
                NavWrap = (typeof response == "object") ? response : this.props.sceneConfigurations["Fade"]();
            } else {
                NavWrap = this.props.sceneConfigurations["Fade"]();
            }
            const route = this.props.renderScene(sceneInfo.name, this.nav(this));

            return (
                <NavWrap state={sceneInfo.state} key={sceneInfo.name} ref={sceneInfo.name} zIndex={sceneInfo.z}>
                    {route}
                </NavWrap>
            );
        }
    });
}

module.exports = navigatorFactory;
*/
module.exports = navigatorFactory;