import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Auth from './pages/Auth.jsx';
import Footer from './components/Footer.jsx';
import Createlisting from './pages/Createlisting.jsx';
import Properties from './pages/Properties.jsx';
import Wishlist from './pages/Wishlist.jsx'
import ListingDetails from './pages/ListingDetails.jsx';
import Verifyotp from './pages/Verifyotp.jsx';
import Requestotp from './pages/Requestotp.jsx';
import GenerateOtp from './pages/GenerateOtp.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PropertyList from './pages/PropertyList.jsx';
import TripList from './pages/TripList.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import Users from './admin/Users.jsx';
import  AdProperties  from './admin/AdProperties.jsx';
import Messages from './admin/Messages.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminRoute from './routes/AdminRoute.jsx';
import OwnerProfile from './pages/OwnerProfile.jsx';
import Tester from './pages/Tester.jsx';
import Booking from './admin/Booking.jsx';


function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/generate-otp" element={<GenerateOtp />} />
        <Route path="/send-verify-otp" element={<Requestotp />} />
        <Route path="/verify-otp" element={<Verifyotp />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route element={<AdminRoute />}> */}
          <Route path="/admin/properties" element={<AdProperties />} />
        {/* </Route> */}


        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/createlist" element={<Createlisting />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/profile" element={<OwnerProfile/>} />
          

          <Route path='/admin' element={<AdminDashboard/>}/>
          <Route path="/admin/users" element={<Users />} />
          {/* <Route path="/admin/properties" element={<AdProperties/>} /> */}
          <Route path="/admin/messages" element={<Messages/>} />

          <Route path="/admin/booking" element={<Booking/>} />


          <Route path='/tester' element={<Tester/>} />

 
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
