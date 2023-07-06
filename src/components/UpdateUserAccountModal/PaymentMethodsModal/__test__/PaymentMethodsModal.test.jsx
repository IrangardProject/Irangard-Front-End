// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import PaymentMethodsModal from '../../PaymentMethodsModal';
// import { AuthProvider } from '../../../../context/AuthContext';

// jest.mock('../../../../config/axios', () => ({
//   get: jest.fn(),
// }));

// describe('PaymentMethodsModal', () => {
//   it('closes the modal when close button is clicked', () => {
//     const setOpenMock = jest.fn();
//     render(
//       <AuthProvider>
//         <PaymentMethodsModal open={true} setOpen={setOpenMock} />
//       </AuthProvider>
//     );

//     const closeButton = screen.getByLabelText('Close');
//     fireEvent.click(closeButton);

//     expect(setOpenMock).toHaveBeenCalledTimes(1);
//     expect(setOpenMock).toHaveBeenCalledWith(false);
//   });

//   it('calls Pay function when online payment method is selected', () => {
//     const payMock = jest.fn();

//     render(
//       <AuthProvider>
//         <PaymentMethodsModal open={true} setOpen={() => {}} Pay={payMock} />
//       </AuthProvider>
//     );

//     const paymentButton = screen.getByText('پرداخت');
//     fireEvent.click(paymentButton);

//     expect(payMock).toHaveBeenCalledTimes(1);
//   });

//   it('calls API function when wallet payment method is selected and credit is sufficient', () => {
//     const apiInstance = require('../../../../config/axios');
//     const apiCallMock = jest.fn();
//     apiInstance.get.mockResolvedValue({ data: { status: 'success' } });
//     apiInstance.get.mockImplementation(apiCallMock);

//     render(
//       <AuthProvider>
//         <PaymentMethodsModal open={true} setOpen={() => {}} />
//       </AuthProvider>
//     );

//     const walletPaymentButton = screen.getByText('کیف پول ایران‌گرد');
//     fireEvent.click(walletPaymentButton);

//     const paymentButton = screen.getByText('پرداخت');
//     fireEvent.click(paymentButton);

//     expect(apiCallMock).toHaveBeenCalledTimes(1);
//   });

//   it('disables wallet payment button when credit is insufficient', () => {
//     render(
//       <AuthProvider>
//         <PaymentMethodsModal open={true} setOpen={() => {}} />
//       </AuthProvider>
//     );

//     const walletPaymentButton = screen.getByText('کیف پول ایران‌گرد');
//     expect(walletPaymentButton).toBeDisabled();
//   });
// });
