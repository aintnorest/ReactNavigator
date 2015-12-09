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
        return (
            <div className="VZ_Card">
            {this.props.nmb}
            </div>
        );
    },

});
