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
        console.log("This is being Rendered ",this.props.nmb);
        return (
            <div key={"card"+this.props.nmb} className="VZ_Card">
            {this.props.nmb}
            </div>
        );
    },

});
