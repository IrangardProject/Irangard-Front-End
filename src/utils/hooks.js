import { useMediaQuery } from '@mui/material';

export const useMobile = () => useMediaQuery('(max-width: 768px)');

export const useMobileFilters = () => useMediaQuery('(max-width: 1000px)')
