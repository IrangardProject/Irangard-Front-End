import React from 'react';
import { LoginForm } from '../Forms';
import { LoginModalForm } from '../Common';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';

// Create a client
const queryClient = new QueryClient();

const MockLoginForm = () => {
  const [fp, setFP] = React.useState(false);
  const toggleForgetPass = () => setFP(!fp);

  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm onForgetPassClick={toggleForgetPass} />
    </QueryClientProvider>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    render(<MockLoginForm />);
  });

  it('should render form correctly', () => {
    expect(screen.getByRole('form')).toBeVisible();
  });

  it('should render the first input field correctly', () => {
    expect(screen.getByLabelText('نام‌کاربری یا ایمیل', { exact: false })).toBeInTheDocument();
  });

  it('should render the second input field when "fp" is true', () => {
    fireEvent.click(screen.getByText('کلیک کنید'));
    expect(screen.getByLabelText('ایمیل')).toBeInTheDocument();
  });

  it('should render submit button correctly', () => {
    expect(screen.getByRole('button', { name: 'ورود' })).toBeVisible();
  });

  it('should display required error when value is invalid', async () => {
    fireEvent.submit(screen.getByRole('button', { name: 'ورود' }));

    // Ensure that both email and password fields have error messages
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });

  it('should display matching error when password is invalid', async () => {
    fireEvent.input(screen.getByPlaceholderText('user_email'), {
      target: {
        value: 'test',
      },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'ورود' }));

    // Ensure that only the password field has an error message
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(screen.getByPlaceholderText('user_email').value).toBe('test');
  });

  it('should display min length error when password is invalid', async () => {
    fireEvent.input(screen.getByPlaceholderText('user_email'), {
      target: {
        value: 'test',
      },
    });
    fireEvent.input(screen.getByPlaceholderText('password'), {
      target: {
        value: 'pass',
      },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'ورود' }));

    // Ensure that only the password field has an error message
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(screen.getByPlaceholderText('user_email').value).toBe('test');
    expect(screen.getByPlaceholderText('password').value).toBe('pass');
  });

  it('should not display error when value is valid', async () => {
    fireEvent.input(screen.getByPlaceholderText('user_email'), {
      target: {
        value: 'test',
      },
    });

    fireEvent.input(screen.getByPlaceholderText('password'), {
      target: {
        value: 'password',
      },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'ورود' }));

    // Ensure that no error messages are displayed
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
  });

  it('should toggle password visibility when the show password button is clicked', () => {
    fireEvent.click(screen.getByPlaceholderText('ToggleShowPassword'));

    const passwordInput = screen.getByPlaceholderText('password');
    expect(passwordInput.type).toBe('text');

    fireEvent.click(screen.getByPlaceholderText('ToggleShowPassword'));

    expect(passwordInput.type).toBe('password');
  });
});

describe('LoginModalForm', () => {
  beforeEach(() => {
    render(
      <LoginModalForm
        fields={['user_email', 'password']}
        onSubmit={() => {}}
        isLoading={false}
        isLogin={true}
        onForgetPassClick={() => {}}
      />
    );
  });

  it('should render the form correctly', () => {
    expect(screen.getByRole('form')).toBeVisible();
  });

  it('should render the input fields correctly', () => {
    expect(screen.getByLabelText('نام‌کاربری یا ایمیل', { exact: false })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });

  it('should toggle password visibility when the show password button is clicked', () => {
    fireEvent.click(screen.getByPlaceholderText('ToggleShowPassword'));

    const passwordInput = screen.getByPlaceholderText('password');
    expect(passwordInput.type).toBe('text');

    fireEvent.click(screen.getByPlaceholderText('ToggleShowPassword'));

    expect(passwordInput.type).toBe('password');
  });

  it('should render the forget password link for the login form', () => {
    expect(screen.getByText('رمز عبور خود را فراموش کرده اید؟')).toBeInTheDocument();
  });

  // it('should call the onForgetPassClick prop when the forget password link is clicked', () => {
  //   const onForgetPassClick = jest.fn();
  //   render(
  //     <LoginModalForm
  //       fields={['user_email', 'password']}
  //       onSubmit={() => {}}
  //       isLoading={false}
  //       isLogin={true}
  //       onForgetPassClick={onForgetPassClick}
  //     />
  //   );

  //   const forgetPassLink = screen.getByText('کلیک کنید', { selector: 'span' });
  //   fireEvent.click(forgetPassLink);
  //   expect(onForgetPassClick).toHaveBeenCalled();
  // });

  it('should render the submit button correctly', () => {
    expect(screen.getByRole('button', { name: 'ورود' })).toBeVisible();
  });
});
