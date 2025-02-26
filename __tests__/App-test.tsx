import { render } from '@testing-library/react-native';
import React from 'react';

import App from '../App';

jest.mock('../navigation/RootNavigationStack', () => {
  const { Text } = require('react-native');
  return () => <Text>RootNavigationStack</Text>;
});

describe('App component', () => {
  it('renders correctly without errors', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});
