// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import UserWallet from '../../UserWallet';
// import { AuthProvider } from '../../../context/AuthContext';

// describe('UserWallet', () => {
//   beforeEach(() => {
//     render(
//     //   <AuthProvider>
//         <UserWallet open={true} setOpen={jest.fn()} />
//     //   </AuthProvider>
//     );
//   });

//   it('should render the component', () => {
//     expect(screen.getByText('کیف پول ایران‌گرد')).toBeInTheDocument();
//   });

//   it('should display the current user credit', () => {
//     expect(screen.getByText('موجودی شما')).toBeInTheDocument();
//     expect(screen.getByText('0 تومان')).toBeInTheDocument();
//   });

//   it('should update the credit amount when the user enters a value', () => {
//     const inputField = screen.getByPlaceholderText('مبالغ دیگر');
//     fireEvent.change(inputField, { target: { value: '500000' } });
//     expect(inputField.value).toBe('500000');
//   });

//   it('should increase the credit amount when the plus button is clicked', () => {
//     const inputField = screen.getByPlaceholderText('مبالغ دیگر');
//     fireEvent.change(inputField, { target: { value: '100000' } });
//     const plusButton = screen.getByTestId('plus-button');
//     fireEvent.click(plusButton);
//     expect(inputField.value).toBe('200000');
//   });

//   it('should decrease the credit amount when the minus button is clicked', () => {
//     const inputField = screen.getByPlaceholderText('مبالغ دیگر');
//     fireEvent.change(inputField, { target: { value: '200000' } });
//     const minusButton = screen.getByTestId('minus-button');
//     fireEvent.click(minusButton);
//     expect(inputField.value).toBe('100000');
//   });

//   it('should make a payment request when the "پرداخت" button is clicked with a valid amount', () => {
//     const inputField = screen.getByPlaceholderText('مبالغ دیگر');
//     fireEvent.change(inputField, { target: { value: '500000' } });
//     const payButton = screen.getByText('پرداخت');
//     fireEvent.click(payButton);
//     // Add assertions for the expected API call and success toast notification
//   });

//   it('should display an error toast when the "پرداخت" button is clicked with an invalid amount', () => {
//     const inputField = screen.getByPlaceholderText('مبالغ دیگر');
//     fireEvent.change(inputField, { target: { value: '-500000' } });
//     const payButton = screen.getByText('پرداخت');
//     fireEvent.click(payButton);
//     // Add assertions for the expected error toast notification
//   });
// });
