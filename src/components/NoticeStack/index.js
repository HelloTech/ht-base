import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { removeNotice } from './actions';
import styles from './styles.scss';
// import { List } from 'immutable';

class NoticeStack extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.makeHandler = this.makeHandler.bind(this);
    this.renderNoticeIcon = this.renderNoticeIcon.bind(this);
  }

  makeHandler(noticeId) {
    return (e) => {
      if (e) {
        e.preventDefault();
      }
      this.props.removeNotice(noticeId);
    };
  }

  renderNoticeIcon(notice) {
    let icon = '';

    switch (notice.type) {
      case 'error':
        icon = <span>Error</span>;
        break;
      case 'warning':
        icon = <span>Warning</span>;
        break;
      case 'notice':
        icon = '';
        break;
      default:
        icon = '';
    }

    return (
      <div className={styles.icon}>
        {icon}
      </div>
    );
  }

  renderNotice(notice) {
    return (
      <div className={styles.container} key={notice.noticeId}>
        <a href="" onClick={this.makeHandler(notice.noticeId)}>
          {this.renderNoticeIcon(notice)}
          {/* eslint-disable */}
          <div dangerouslySetInnerHTML={{ __html: notice.content }} className={styles.content} />
          {/* eslint-enable */}
          {/* TODO ACTIONS */}
        </a>
      </div>
    );
  }

  renderNotifications() {
    const notices = this.props.component.toJS().notices;
    const isOpen = true;

    return notices.length ? (
      <Modal isOpen={isOpen} contentLabel="Modal">
        { notices.map((n) => this.renderNotice(n)) }
      </Modal>
    ) : null;
  }

  render() {
    return this.renderNotifications();

    // return (
    //   <div>
    //     { this.props.component.get('notices').map((n) => {
    //       let actions = null;
    //       const actionWrapperStyle = n.has('actionWrapperStyle') ? n.get('actionWrapperStyle').toJS() : null;
    //       if (List.isList(n.get('action'))) {
    //         actions = (
    //           <div>
    //             {n.get('action').toJS().map((elem, index) => {
    //               return (
    //                 <a
    //                   href={null}
    //                   key={index}
    //                   style={actionWrapperStyle}
    //                   onTouchTap={this.makeHandler(n.get('noticeId'))}
    //                 >
    //                   {elem}
    //                 </a>
    //               );
    //             })}
    //           </div>
    //         );
    //       } else {
    //         actions = (
    //           <div>
    //             <a
    //               key={`${n.get('noticeId')}-ok`}
    //               onTouchTap={this.makeHandler(n.get('noticeId'))}
    //             >
    //               {n.get('action') || 'Ok'}
    //             </a>
    //           </div>
    //         );
    //       }
    //       const title = (
    //         <div>
    //           {n.get('title') ? <h3>{n.get('title')}</h3> : ''}
    //         </div>
    //       );
    //       return (
    //         <div className={styles.container} key={n.get('noticeId')} open title={title}>
    //           <a href="" onClick={this.makeHandler(n.get('noticeId'))}>
    //             {this.renderNoticeIcon(n.toJS())}
    //             {/* eslint-disable */}
    //             <div dangerouslySetInnerHTML={{ __html: n.get('content') }} className={styles.content} />
    //             {/* eslint-enable */}
    //             {n.get('action') ? actions : ''}
    //           </a>
    //         </div>
    //       );
    //     })}
    //   </div>
    // );
  }
}

NoticeStack.propTypes = {
  component: PropTypes.object.isRequired,
  removeNotice: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    component: state.getIn(['components', 'noticeStack']),
  };
}

export default connect(mapStateToProps, { removeNotice })(NoticeStack);
