const testFactory = function ({ React }) {

    return React.createClass({

        shouldComponentUpdate() { return false },
        componentDidMount() {
            console.log(" COMPONENT DID Mount");
        },
        componentWillUnmount() {
            console.log(" COMPONENT DID Unmount");
        },

        render() {
        	return (
	            <div onClick={this.props.click} style={ {width: "50px", height: "50px", position:"absolute",top:this.props.top, background:this.props.background} }>
	                {this.props.content}
	            </div>
	        );
        }
    });
}
export default testFactory;