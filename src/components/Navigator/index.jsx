import { TransitionMotion } from 'react-motion';
import PureRenderMixin      from 'react-addons-pure-render-mixin';
import React                from 'react';
import { bindListener }     from 'utils';
//
function checkforMatch(ary){
    if(ary[0][0].val != undefined) {
        if(Math.floor(ary[0][0].val) != Math.floor(ary[0][1].val)) return false;
    }
    if(ary[1][0].val != undefined) {
        if(Math.floor(ary[1][0].val) != Math.floor(ary[1][1].val)) return false;
    }
    if(ary[2][0].val != undefined) {
        if(Math.floor(ary[2][0].val) != Math.floor(ary[2][1].val)) return false;
    }
    return true;
}
//
export default React.createClass({
    mixins: [PureRenderMixin],
    elementCache: {}, unsubscribe: ()=>{},
    currentCount: 0,

    getInitialState() { return { elements: {} } },

    componentDidMount() {
        this.setState({elements: this.props.initialState.current});
        this.unsubscribe = bindListener(this.props.listener, state => {
            if(state.current === this.state.elements) return;
            this.setState({elements: state.current});
        });
    },

    componentWillUnmount() { this.unsubscribe(); },

    getStyles() {
        try {
            let configs = {};
            Object.keys(this.state.elements).forEach(key => {
                configs[key] = this.props.sceneConfigurations[key].Styles(this.state.elements[key]);
            });
            return configs;
        } catch(ex) {
            throw new Error(ex);
        }
    },

    willEnter(key) {
        /* Cache the element so it can be refrenced instead of recreated on every loop */
        this.elementCache[key] = this.props.sceneConfigurations[key].VM(this.props.store);
        return this.props.sceneConfigurations[key].Enter;
    },

    willLeave(key, style, value, currentSpeed) {
        /* Remove cache when the elment is done transitioning */
        const cS = currentSpeed[key];
        const sC = this.props.sceneConfigurations[key].Leave;
        if(this.elementCache[key] === undefined) return;
        if(checkforMatch([[cS.x,sC.x],[cS.y,sC.y],[cS.opacity,sC.opacity]])) {
            delete this.elementCache[key];
            if(Object.keys(value).length === this.currentCount) this.props.finishedTransition();
        }
        return sC;
    },

    sceneObj(iS) {
        return (key) => {
            const {...style} = iS[key];
            const s = {opacity:style.opacity/100, WebkitTransform:"translate("+style.x+"vw,"+style.y+"vh)", transform: "translate("+style.x+"vw,"+style.y+"vh)", zIndex: style.z};
            return (
                <div key={key} style={s}>
                    {(this.elementCache[key]) ? this.elementCache[key] : false}
                </div>
            );
        };
    },

    interpolatedStyles(iS) {

        return (
            <div>
                {Object.keys(iS).map(this.sceneObj(iS))}
            </div>
        );
    },

    render() {
        return (
            <TransitionMotion
              styles={this.getStyles()}
              willEnter={this.willEnter}
              willLeave={this.willLeave}>
                {interpolatedStyles => this.interpolatedStyles(interpolatedStyles)}
            </TransitionMotion>
        );
    }

});
