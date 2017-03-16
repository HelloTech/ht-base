import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { itemClicked } from '../actions';
import { HeaderSubItemButton } from '../elements';

class HeaderSubItem extends React.Component {

  itemClicked(item) {
    return (event) => {
      event.preventDefault();
      this.props.itemClicked(item);
      if (item.get('link')) {
        this.props.push(item.get('link'));
      }
    };
  }

  render() {
    const item = this.props.item;
    return (
      <HeaderSubItemButton
        active={item.get('active')}
        href={item.get('link')}
        onClick={::this.itemClicked(item)}
      >
        { item.get('name') }
      </HeaderSubItemButton>
    );
  }
}

HeaderSubItem.propTypes = {
  item: PropTypes.object.isRequired,
  itemClicked: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default connect(null, { itemClicked, push })(HeaderSubItem);
