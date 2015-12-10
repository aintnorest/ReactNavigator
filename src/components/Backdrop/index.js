/* src/components/Backdrop */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';



export default React.createClass({
    mixins: [PureRenderMixin],

    componentWillMount() { ss.use(); },
    componentWillUnmount() { ss.unuse(); },

    render() {
        console.log("Background is Rendering");
        return (
            <div key="b1" className="VZ_Backdrop">
            </div>
        );
    },

});
