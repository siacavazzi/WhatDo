import React, {PropTypes, Component} from 'react/addons';
//import shouldPureComponentUpdate from 'react-pure-render/function';

export default class MapMarker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  //shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
       <div>
          {this.props.text}
       </div>
    );
  }
}