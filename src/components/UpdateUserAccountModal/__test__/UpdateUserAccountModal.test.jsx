import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateUserAccountModal from '../../UpdateUserAccountModal';

describe('UpdateUserAccountModal', () => {
//   it('displays modal content', () => {
//     // Render the component with the necessary props
//     render(<UpdateUserAccountModal open={true} setOpen={() => {}} setPaymentMethodsModal={() => {}} />);

//     // Verify that the modal content is rendered
//     expect(screen.getByText('ارتقای حساب کاربری')).toBeInTheDocument();

//     expect(
//       screen.getByText('شما با پرداخت هزینه تعیین‌شده، می‌توانید حساب کاربری خود را به حالت ویژه ارتقا دهید.')
//     ).toBeInTheDocument();

//     expect(screen.getByText('پرداخت و ارتقای حساب')).toBeInTheDocument();
//   });

  it('calls setOpen and setPaymentMethodsModal functions on button click', () => {
    // Create mock functions for setOpen and setPaymentMethodsModal
    const setOpenMock = jest.fn();
    const setPaymentMethodsModalMock = jest.fn();

    // Render the component with the mock functions
    render(
      <UpdateUserAccountModal open={true} setOpen={setOpenMock} setPaymentMethodsModal={setPaymentMethodsModalMock} />
    );

    // Simulate a button click
    fireEvent.click(screen.getByText('پرداخت و ارتقای حساب'));

    // Verify that the mock functions were called
    expect(setOpenMock).toHaveBeenCalledTimes(1);
    expect(setOpenMock).toHaveBeenCalledWith(false);

    expect(setPaymentMethodsModalMock).toHaveBeenCalledTimes(1);
    expect(setPaymentMethodsModalMock).toHaveBeenCalledWith(true);
  });

  it('closes the modal when onClose is called', () => {
    // Create a mock function for setOpen
    const setOpenMock = jest.fn();

    // Render the component with the mock function
    render(
      <UpdateUserAccountModal open={true} setOpen={setOpenMock} setPaymentMethodsModal={() => {}} />
    );

    // Simulate a click on the modal close button
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    // Verify that the setOpen mock function was called with false
    expect(setOpenMock).toHaveBeenCalledTimes(1);
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  it('calls setPaymentMethodsModal when payment button is clicked', () => {
    // Create mock functions for setOpen and setPaymentMethodsModal
    const setOpenMock = jest.fn();
    const setPaymentMethodsModalMock = jest.fn();

    // Render the component with the mock functions
    render(
      <UpdateUserAccountModal
        open={true}
        setOpen={setOpenMock}
        setPaymentMethodsModal={setPaymentMethodsModalMock}
      />
    );

    // Simulate a click on the payment button
    const paymentButton = screen.getByText('پرداخت و ارتقای حساب');
    fireEvent.click(paymentButton);

    // Verify that the setPaymentMethodsModal mock function was called with true
    expect(setPaymentMethodsModalMock).toHaveBeenCalledTimes(1);
    expect(setPaymentMethodsModalMock).toHaveBeenCalledWith(true);
  });
});
