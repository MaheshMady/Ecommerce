import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router ,Routes , Route} from "react-router-dom"
import Protectedroute from './protectedroutes/protectedroute.jsx'
import Login from './pages/login.jsx'
import AdminProtectedroute from './protectedroutes/AdminProtectedroute.jsx'
import AdminDashboard from './pages/admindashboard.jsx'
import Productview from './pages/productview.jsx'
import Logout from './pages/Logout.jsx'
import Products from './pages/products.jsx'
import ProductDetailsView from './pages/productdetailsview.jsx'
import Signin from './pages/signin.jsx'
import Cart from './pages/cart.jsx'
import Payment from './pages/payment.jsx'
import Orders from './pages/orders.jsx'
import Adminorders from './pages/adminorders.jsx'
import Profile from './pages/Profile.jsx'
import Forgotpassword from './pages/Forgotpassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentFailure from './pages/PaymentFailure.jsx'
import Verifyemail from './pages/verifyemail.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google"
import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
    <Router>
      <ScrollToTop />
      <Routes>
        
         <Route exact path="/" element={<App/>}></Route>
         <Route exact path="/products" element={<Products/>}></Route>
         <Route exact path="/productdetailview" element={<ProductDetailsView/>}></Route>

        <Route element={<Protectedroute/>}>
           <Route exact path="/cart" element={<Cart/>}></Route>
            <Route exact path="/profile" element={<Profile/>}></Route>
            <Route exact path="/order" element={<Orders/>}></Route>
           <Route exact path="/payment" element={<Payment/>}></Route>
           <Route exact path="/success" element={<PaymentSuccess/>}></Route>
           <Route exact path="/failure" element={<PaymentFailure/>}></Route>
        </Route>
        
        <Route element={<AdminProtectedroute/>}>
           <Route exact path="/admindashboard" element={<AdminDashboard/>}></Route>
           <Route exact path="/productview" element={<Productview/>}></Route>
           <Route exact path="/adminorders" element={<Adminorders/>}></Route>
        </Route>

        <Route exact path="/signin" element={<Signin/>}></Route> 
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/logout" element={<Logout/>}></Route>
         <Route exact path="/forgotpassword" element={<Forgotpassword/>}></Route>
          <Route exact path="/resetlink/:token" element={<ResetPassword/>}></Route>
        <Route exact path="/verify/token" element={<Verifyemail/>}></Route>


      </Routes>
    </Router>
    </GoogleOAuthProvider>
  </StrictMode>,
)
