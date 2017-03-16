import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SidebarDiv, MainItems, SubItems } from './elements';
import MainItem from './MainItem';
import MainHeaderItem from './MainHeaderItem';
import SubItem from './SubItem';
import HeaderSubItem from './HeaderSubItem';

class Sidebar extends React.Component {

  render() {
    const sidebar = this.props.sidebar;
    return (
      <SidebarDiv>
        { sidebar.get('open') && (
          <SubItems>
            <HeaderSubItem
              item={sidebar.get('headerSubItem')}
            />
            { sidebar.get('subItems').map((subItem, index) =>
              <SubItem
                key={index}
                item={subItem}
              >
                { subItem.get('name') }
              </SubItem>
            )}
          </SubItems>
        )}
        { (sidebar.get('preview') || sidebar.get('open')) && (
          <MainItems>
            <MainHeaderItem
              open={sidebar.get('open')}
            />
            { sidebar.get('mainItems').map((mainItem, index) =>
              <MainItem
                key={index}
                item={mainItem}
              />
            )}
          </MainItems>
        )}
      </SidebarDiv>
    );
  }
}

Sidebar.propTypes = {
  sidebar: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    sidebar: state.getIn(['components', 'sidebar']),
  };
}

export default connect(mapStateToProps, { })(Sidebar);
