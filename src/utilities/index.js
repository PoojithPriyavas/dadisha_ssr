import { jwtDecode } from 'jwt-decode';

export const isTokenValid = () => {
      const token = localStorage.getItem('dadishaToken');
  try {
    const decoded = jwtDecode(token);
    // console.log(decoded);

    const currentTime = Date.now() / 1000;
    // console.log(currentTime);

    if (decoded.exp && decoded.exp > currentTime) {
      return true;
    } else {
      localStorage.removeItem('dadishaToken');
      return false;
    }
  } catch (e) {
    return false;
  }
};
