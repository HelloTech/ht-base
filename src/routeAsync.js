import React from 'react'
const {object} = React.PropTypes;


const asyncRoute = function(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    mounted = false;

    state = {
      Component: AsyncComponent.Component
    };

    componentWillMount() {
      if ( this.state.Component === null ) {
        getComponent().then(m => m.default).then(Component => {
          AsyncComponent.Component = Component;
          if ( this.mounted ) {
            this.setState({Component});
          }
        })
      }
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const {Component} = this.state;

      if ( Component !== null ) {
        return <Component {...this.props} />
      }
      return null; // or <div /> with a loading spinner, etc..
    }
  }
};

// export default AsyncRoute
export const HomePage = asyncRoute(() => System.import('./containers/HomePage/index.js'));
export const LoginPage = asyncRoute(() => System.import('./containers/LoginPage/index.js'));
export const SkuPage = asyncRoute(() => System.import('./containers/SkuPage/index.js'));
export const SkuCategoryPage = asyncRoute(() => System.import('./containers/SkuCategoryPage/index.js'));
export const PlansPage = asyncRoute(() => System.import('./containers/PlansPage/index.js'));
export const PlanPage = asyncRoute(() => System.import('./containers/PlanPage/index.js'));
export const NotFoundPage = asyncRoute(() => System.import('./containers/NotFoundPage/index.js'));
