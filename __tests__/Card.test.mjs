import React from 'react';
import {render} from '@testing-library/react-native';
import Card from '../src/components/Card';

describe('Card Component', () => {
  test('renders movie title', () => {
    const {getByText} = render(
      <Card
        visibleData={{
          title: 'Test Movie',
          id: 1,
          overview: 'Test Overview',
          vote_average: 8,
        }}
      />,
    );

    const titleElement = getByText('Test Movie');
    expect(titleElement).toBeTruthy();
  });
});
