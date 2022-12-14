import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoutes = ({ children }) => {
   const { user, loader } = useContext(AuthContext);
   const location = useLocation();

   if (loader) {
      return <div>Loading...</div>;
   }

   if (user?.uid) {
      return children;
   }

   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
