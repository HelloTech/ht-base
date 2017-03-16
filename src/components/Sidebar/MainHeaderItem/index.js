import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { MainHeaderItemButton } from '../elements';
import { toggleSidebar } from '../actions';

class MainHeaderItem extends React.Component {

  render() {
    return (
      <MainHeaderItemButton
        onClick={::this.props.toggleSidebar}
      >
        { this.props.open && (
          <span>Close</span>
        )}
        { !this.props.open && (
          <span>Open</span>
        )}
      </MainHeaderItemButton>
    );
  }
}

MainHeaderItem.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default connect(null, { toggleSidebar })(MainHeaderItem);
