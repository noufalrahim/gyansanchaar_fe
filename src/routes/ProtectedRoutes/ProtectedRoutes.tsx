import { ROUTE_URLS } from "@/constants";
import { useReadData } from "@/hooks/useReadData";
import { setUser } from "@/redux/userSlice";
import { UserType } from "@/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const {
        data,
        isLoading,
      } = useReadData<UserType>('users', '/users/user/me');
    
      useEffect(() => {
        if (data) {
          dispatch(setUser(data));
        }
      }, [data, dispatch]);
    
      if (isLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p>Loading...</p>
          </div>
        );
      }
    
      if (!token) {
        return <Navigate to={ROUTE_URLS.LOGIN} state={{ from: location.pathname }} replace />;
      }
    
      return <>{children}</>;
};

