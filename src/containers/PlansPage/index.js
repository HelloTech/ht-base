import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { HTButton } from '../../components/HTKit/Buttons/index';
import { hidePreview } from '../../components/Sidebar/actions';
import { loadPlans } from './actions';
import styles from './styles.scss';

class PlansPage extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.goToPlan = this.goToPlan.bind(this);
  }

  componentWillMount() {
    this.props.hidePreview();
    this.props.loadPlans();
  }

  goToPlan(plan) {
    return (event) => {
      event.preventDefault();
      this.props.push(`/plans/${plan.seoName}`);
    };
  }

  renderPlan(plan, key = 0) {
    return (
      <div key={key} className={styles.plan}>
        <div>
          <div><strong>{plan.name}</strong></div>
          <div><HTButton scheme="tealGreen" onClick={this.goToPlan(plan)}>Get Started</HTButton></div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: plan.description }}></div>
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
    );
  }

  renderPlans(plans) {
    return _.map(plans, (plan, index) => this.renderPlan(plan, index));
  }

  render() {
    const plans = this.props.plans ? this.props.plans.toJS() : [];

    return (
      <div className={styles.container}>
        <div>Home Support plans</div>
        <div>Tech problems can happen when you least expect it. Be prepared with a HelloTech Home Support Plan. All of our support plans include unlimited online support. We’ll connect to your computer to perform your service remote - whenever you need it.</div>
        <div>{this.renderPlans(plans)}</div>
      </div>
    );
  }
}

PlansPage.propTypes = {
  loadPlans: PropTypes.func.isRequired,
  hidePreview: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  plans: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    plans: state.getIn(['entities', 'plans', 'list']),
  };
}

export default connect(mapStateToProps, { loadPlans, push, hidePreview })(PlansPage);

