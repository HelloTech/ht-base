import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { TopNavDiv, SidebarToggle } from './elements';
import { toggleSidebar } from '../../components/Sidebar/actions';

class TopNav extends React.Component {
  static propTypes = {
    sidebar: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
  };

  toggleSidebar(event) {
    event.preventDefault();
    this.props.toggleSidebar();
  }

  render() {
    const sidebar = this.props.sidebar;
    return (
      <TopNavDiv>
        { !sidebar.get('preview') && !sidebar.get('open') && (
          <SidebarToggle href onClick={::this.toggleSidebar}>
            &lt;=
          </SidebarToggle>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TopNav
      </TopNavDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    sidebar: state.getIn(['components', 'sidebar']),
  };
}

export default connect(mapStateToProps, { toggleSidebar })(TopNav);
