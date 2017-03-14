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
export const WelcomePage = asyncRoute(() => System.import('./../containers/pages/welcome'));
export const AboutPage = asyncRoute(() => System.import('./../containers/pages/about'));
export const ImprintPage = asyncRoute(() => System.import('./../containers/pages/imprint'));
