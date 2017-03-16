import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hidePreview } from '../../components/Sidebar/actions';
import { loadPlan } from './actions';
import styles from './styles.scss';

class PlanPage extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.hidePreview();
    this.props.loadPlan(this.props.name);
  }

  onFormSubmit() {}

  renderPlanInfo(plan) {
    return plan ? (
      <div>
        <div>{plan.name}</div>
        <div>View list of Service included</div>
        <div>
          <div>{plan.monthlyPrice}/m</div>
          <div>{plan.yearlyPrice}/yr</div>
        </div>
        <div>
          <div>{plan.remoteServices} remote services</div>
          <div>
            <div>{plan.discount}% off</div>
            <div>{plan.discount}% discount for all other services </div>
          </div>
          <div>
            {plan.devices} devices covered
          </div>
        </div>
      </div>
    ) : null;
  }

  renderPurchaserDetails() {
    return (
      <div>
        <div>Purchaser details</div>
        <div>FORM IS GONNA BE HERE...</div>
      </div>
    );
  }

  renderPaymentsDetails() {
    return (
      <div>
        <div>Payment Details</div>
        <div>FORM IS GONNA BE HERE...</div>
      </div>
    );
  }

  render() {
    const plan = this.props.plan ? this.props.plan.toJS() : null;
    return (
      <div className={styles.container}>
        {this.renderPlanInfo(plan)}
        {this.renderPurchaserDetails()}
        {this.renderPaymentsDetails()}
      </div>
    );
  }
}

PlanPage.propTypes = {
  name: PropTypes.string,
  loadPlan: PropTypes.func.isRequired,
  hidePreview: PropTypes.func.isRequired,
  plan: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const { name } = ownProps.params;
  return {
    name,
    plan: state.getIn(['pages', 'plan', 'plan']),
  };
}

export default connect(mapStateToProps, { loadPlan, hidePreview })(PlanPage);
