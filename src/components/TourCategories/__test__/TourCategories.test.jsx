import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TourCategories from '../../TourCategories';

describe('TourCategories', () => {
  it('renders tour category cards', () => {
    render(
      <Router>
        <TourCategories />
      </Router>
    );

    // Verify that the tour category cards are rendered
    const tourCategoryCards = screen.getAllByTestId('tour-category-card');
    expect(tourCategoryCards.length).toBe(12);
  });

  it('displays tour category names', () => {
    render(
      <Router>
        <TourCategories />
      </Router>
    );
    // Verify that the tour category names are displayed
    const tourCategoryNames = screen.getAllByTestId('tour-category-name');
    expect(tourCategoryNames).toHaveLength(12);
  });
});
