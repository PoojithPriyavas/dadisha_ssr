import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/context';

export const RouteChangeHandler = () => {
  const location = useLocation();
  const { setOpenBulkOrderPopUp } = useAppContext();

  useEffect(() => {
    setOpenBulkOrderPopUp(false);
  }, [location.pathname, setOpenBulkOrderPopUp]);

  return null;
};