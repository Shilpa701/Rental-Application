import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
// import AuthContextAPI from './contexts/AuthContextAPI.jsx';  // ✅ Default import (no {})
import { WishlistProvider } from './contexts/WishlistContext.jsx'
import { AuthProvider } from './contexts/AuthContextAPI.jsx'
createRoot(document.getElementById('root')).render(

    <StrictMode>
 {/* <AuthContextAPI> */}
       <BrowserRouter> 
       <WishlistProvider> 
      <AuthProvider>   <App /></AuthProvider>
         </WishlistProvider>
        </BrowserRouter>
  {/* </AuthContextAPI> */}
  
    </StrictMode>,

)
