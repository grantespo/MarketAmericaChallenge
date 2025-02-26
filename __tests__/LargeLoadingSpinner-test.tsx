import React from 'react';
import { render } from '@testing-library/react-native';
import LargeLoadingSpinner from '../components/common/LargeLoadingSpinner';

describe('LargeLoadingSpinner', () => {
  it('renders fullScreen by default', () => {
    const { getByTestId } = render(<LargeLoadingSpinner />);
    const container = getByTestId('spinner-container');

    expect(container.props.style).toEqual(
      expect.objectContaining({ flex: 1, marginTop: 0 })
    );

    const spinner = getByTestId('spinner-activity-indicator');
    expect(spinner.props.size).toBe('large');
    expect(spinner.props.color).toBe('#007AFF');
  });

  it('renders without fullScreen and custom marginTop', () => {
    const { getByTestId } = render(
      <LargeLoadingSpinner fullScreen={false} marginTop={20} />
    );
    const container = getByTestId('spinner-container');

    expect(container.props.style).toEqual(
      expect.objectContaining({ flex: undefined, marginTop: 20 })
    );
  });
});
