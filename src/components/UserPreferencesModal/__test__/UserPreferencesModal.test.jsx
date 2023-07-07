import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom/extend-expect';
import UserPreferencesModal from '../../UserPreferencesModal';
import { AuthProvider } from '../../../context/AuthContext';

// Create a client
// const queryClient = new QueryClient();

// const MockUserPreferencesModal = ({ open = true }) => (
//   <QueryClientProvider client={queryClient}>
//     <AuthContextProvider>
//       <UserPreferencesModal open={open} setOpen={() => {}} usernameQuery="" />
//     </AuthContextProvider>
//   </QueryClientProvider>
// );

describe('UserPreferencesModal', () => {
  it('should render the modal when open is true', () => {
    render(
      <AuthProvider>
        <UserPreferencesModal open={true} />
      </AuthProvider>
    );
    expect(screen.getByTestId('user-preferences-modal')).toBeInTheDocument();
  });

  it('should not render the modal when open is false', () => {
    render(
      <AuthProvider>
        <UserPreferencesModal open={false} setOpen={() => {}} usernameQuery="" />
      </AuthProvider>
    );
    expect(screen.queryByTestId('user-preferences-modal')).toBeNull();
  });

  it('should display the correct title', () => {
    render(
      <AuthProvider>
        <UserPreferencesModal open={true} />
      </AuthProvider>
    );
    expect(screen.getByText('لیست علاقه‌مندی‌های شما')).toBeInTheDocument();
  });

  it('should display multiple event types selectors correctly', () => {
    render(
      <AuthProvider>
        <UserPreferencesModal open={true} />
      </AuthProvider>
    );
    expect(screen.getByText('دسته‌بندی رویداد‌ها')).toBeInTheDocument();
  });

  it('should display multiple tour categories selectors correctly', () => {
    render(
      <AuthProvider>
        <UserPreferencesModal open={true} />
      </AuthProvider>
    );
    expect(screen.getByText('دسته‌بندی تور‌ها')).toBeInTheDocument();
  });

  //     it('should display the selected event types correctly', () => {
  //       const selectedEventTypes = ['کنسرت', 'نمایش'];
  //       render(
  //         <AuthProvider>
  //           <UserPreferencesModal open={true} />
  //         </AuthProvider>
  //       );
  //       fireEvent.click(screen.getByTestId('multiple-checkbox-events'));
  //       selectedEventTypes.forEach(type => {
  //         expect(screen.getByLabelText(type)).toBeInTheDocument();
  //       });
  //     });

  //   it('should display the selected tour categories correctly', () => {
  //     const selectedTourCategories = ['تاریخی', 'فرهنگی'];
  //     render(
  //       <AuthProvider>
  //         <UserPreferencesModal open={true} />
  //       </AuthProvider>
  //     );
  //     fireEvent.click(screen.getByTestId('multiple-checkbox-tours'));
  //     selectedTourCategories.forEach(category => {
  //       expect(screen.getByLabelText(category)).toBeInTheDocument();
  //     });
  //   });

  //   it('should update the selected event types when checkboxes are clicked', () => {
  //     render(
  //       <AuthProvider>
  //         <UserPreferencesModal open={true} />
  //       </AuthProvider>
  //     );
  //     const checkbox = screen.getByLabelText('Concert');
  //     fireEvent.click(checkbox);
  //     expect(checkbox.checked).toBe(false);
  //   });

  //   it('should update the selected tour categories when checkboxes are clicked', () => {
  //     render(<MockUserPreferencesModal />);
  //     const checkbox = screen.getByLabelText('City Tours');
  //     fireEvent.click(checkbox);
  //     expect(checkbox.checked).toBe(false);
  //   });

  //   it('should trigger the API call and show success toast message when the form is submitted successfully', async () => {
  //     // Mock the API call with a success response
  //     const mockPost = jest.fn().mockResolvedValueOnce({ data: {} });
  //     jest.mock('../../../config/axios', () => ({
  //       post: mockPost,
  //     }));

  //     render(
  //       <AuthProvider>
  //         <UserPreferencesModal open={true} />
  //       </AuthProvider>
  //     );
  //     const submitButton = screen.getByRole('button', { name: 'ثبت تغییرات' });
  //     fireEvent.click(submitButton);

  //     // Wait for the toast message to appear
  //     await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for a certain duration, e.g., 1 second

  //     // Check for the presence of the success toast message
  //     const successToast = screen.getByText('اطلاعات با موفقیت تغییر یافت');
  //     expect(successToast).toBeInTheDocument();

  //     expect(mockPost).toHaveBeenCalledTimes(1);
  //   });

//   it('should trigger the API call and show error toast message when the form submission fails', async () => {
//     // Mock the API call with an error response
//     const mockPost = jest.fn().mockRejectedValueOnce(new Error('API error'));
//     jest.mock('../../../config/axios', () => ({
//       post: mockPost,
//     }));

//     const mockAuth = {
//       user: {
//         id: 123, // Provide a valid user ID here
//       },
//     };

//     render(
//       <AuthProvider value={mockAuth}>
//         <UserPreferencesModal open={true} />
//       </AuthProvider>
//     );

//     const submitButton = screen.getByRole('button', { name: 'ثبت تغییرات' });
//     fireEvent.click(submitButton);

//     // Wait for the error toast component to appear
//     await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for a certain duration, e.g., 1 second

//     // Check for the presence of the error toast component
//     const errorToast = screen.getByTestId('error-toast');
//     expect(errorToast).toBeInTheDocument();

//     expect(mockPost).toHaveBeenCalledTimes(1);
//   });

  it('should close the modal when the close button is clicked', () => {
    const setOpen = jest.fn();
    render(
      <AuthProvider>
        <UserPreferencesModal open={true} setOpen={setOpen} />
      </AuthProvider>
    );
    const closeButton = screen.getByTestId('close-btn-id');
    fireEvent.click(closeButton);
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
