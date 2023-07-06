// import React from 'react';
// import { render } from '@testing-library/react';
// import TourCard from '../../TourCard';
// import { BrowserRouter as Router } from 'react-router-dom';

// describe('TourCard', () => {
//   const mockTour = {
//     id: 1,
//     title: 'Test Tour',
//     start_date: '2023-07-06',
//     end_date: '2023-07-05',
//     cost: 1000,
//     capacity: 10,
//     bookers: [],
//     images: [],
//   };

//   it('renders tour card correctly', () => {
//     // const { getByText, getByAltText } = render(
//     //   <Router>
//     //     <TourCard tour={mockTour} />
//     //   </Router>
//     // );

//     expect(screen.getByAltText('Test Tour')).toBeInTheDocument();
//     expect(screen.getByText('Test Tour')).toBeInTheDocument();
//   });

//   it('displays the correct number of tour days', () => {
//     const { getByText } = render(
//       <Router>
//         <TourCard tour={mockTour} />
//       </Router>
//     );

//     expect(getByText('(۴ روزه)')).toBeInTheDocument();
//   });

//   it('displays the formatted tour cost', () => {
//     const { getByText } = render(
//       <Router>
//         <TourCard tour={mockTour} />
//       </Router>
//     );

//     expect(getByText('۱٬۰۰۰')).toBeInTheDocument();
//   });

//   it('displays the remaining tour capacity', () => {
//     const { getByText } = render(
//       <Router>
//         <TourCard tour={mockTour} />
//       </Router>
//     );

//     expect(getByText('ظرفیت تور: ۱۰ نفر')).toBeInTheDocument();
//   });

//   it('displays the tour start date', () => {
//     const { getByText } = render(
//       <Router>
//         <TourCard tour={mockTour} />
//       </Router>
//     );

//     expect(getByText('۱۵ تیر ۱۴۰۲')).toBeInTheDocument();
//   });
// });
