import React from 'react';
import { shallow } from 'enzyme';

import AppRoot from '../index';
import configureStore from '../../../store';

describe('<AppRoot />', () => {
  it('uses redux Provider', () => {
    const store = configureStore({});

    const renderedComponent = shallow(
      <AppRoot store={store}>
        <div>a child</div>
      </AppRoot>
    );

    expect(renderedComponent.find('Provider').length).toEqual(1);
  });
});
