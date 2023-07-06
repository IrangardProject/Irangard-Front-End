import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import Demo from '../UsersList';
import { createTheme } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    background: {
      paper: 'red',
    },
  },
  typography: {
    h5: {
      
    },
  },
});


const queryClient = new QueryClient();

describe('Demo', () => {
  test('renders correctly', () => {
    const component = shallow(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Demo />
        </ThemeProvider>
      </QueryClientProvider>
    );
    expect(component.exists()).toBe(true);
  });

  test('matches the snapshot', () => {
    const component = create(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Demo />
        </ThemeProvider>
      </QueryClientProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
