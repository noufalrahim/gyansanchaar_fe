import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTE_URLS } from "./constants";
import { Layout } from "./layout";
import { HomePage } from "./pages/Home";
import { AboutCollegePage, CollegesPage } from "./pages/Colleges";
import ApplyCollegePage from "./pages/ApplyCollegePage";
import { DashboardPage } from "./pages/DashboardPage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useEffect } from "react";
import { useReadData } from "./hooks/useReadData";
import { UserType } from "./types";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { CourseDetailsPage } from "./pages/CourseDetailsPage";

function App() {
  const dispatch = useDispatch();

  const { data } = useReadData<UserType>('users', '/users/user/me');

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setUser(data));
    }

  }, [dispatch, data]);


  return (
    <Router>
      <Routes>
        <Route path={ROUTE_URLS.LOGIN} element={<h1>Login</h1>} />
        <Route path={ROUTE_URLS.HOME} element={<Layout><HomePage /></Layout>} />
        <Route path={ROUTE_URLS.COLLEGES} element={<Layout><CollegesPage /></Layout>} />
        <Route path={ROUTE_URLS.ABOUT_COLLEGE} element={<Layout><AboutCollegePage /></Layout>} />
        <Route path={ROUTE_URLS.APPLY_COLLEGE} element={<ProtectedRoute><Layout><ApplyCollegePage /></Layout></ProtectedRoute>} />
        <Route path={ROUTE_URLS.DASHBOARD} element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
        <Route path={ROUTE_URLS.ABOUT_COURSE} element={<Layout><CourseDetailsPage /></Layout>} />
      </Routes>
    </Router>

  )
}

export default App