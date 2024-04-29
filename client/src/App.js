//import { DatePicker } from 'antd';
// import { Button} from 'antd';
import './stylesheets/alignment.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import './stylesheets/text-elements.css';
import './stylesheets/theme.css';
import './stylesheets/layout.css';


import {useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Loader from "./components/Loader";

import ProtectedRoute from './components/protectedRoute';
import PublicRoute from './components/publicRoute';
import Transactions from './pages/Transactions';
import Requests from './pages/Requests';
import Users from './pages/Users';
import Admins from './pages/Admins';
import Profile from './pages/Profile';
import EditProfile from './components/EditProfile';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
         {loading && <Loader />}
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />

          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/admins" element={<ProtectedRoute><Admins /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>}/>
          <Route path="/forgot-password" element = {<PublicRoute><ForgotPasswordPage/></PublicRoute>}/>
          <Route path="/reset-password/:token" element = {<PublicRoute><ResetPasswordPage /></PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
     
  


  );
}

export default App;
