import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    
    <div  className='d-flex flex-column align-items-center justify-content-center mt-5 shadow'>
        <div className='footer d-flex justify-content-evenly w-100  '>
        {/* Intro */}
        <div style={{width:'300px'}} className='website'>
             <h4 className='fw-bolder text-dark'> <i class="fa-solid fa-house"></i>
           VILLA</h4>
             <p>Find your dream villa with SmartVilla – Easy booking, hassle-free stays.</p>
             <p>© 2025 SmartVilla. Your perfect stay, just a click away!</p>
             <p>SmartVilla Trusted rentals, unforgettable experiences.</p>
        </div>
        {/* Links */}
         <div className='d-flex flex-column'>
             <h5 className='text-dark'>Links</h5>
              <Link to={'/'} style={{textDecoration:'none',color:'grey'}}>Home</Link>
              <Link to={'/login'} style={{textDecoration:'none',color:'grey'}}>Login</Link>
              <Link to={'/register'} style={{textDecoration:'none',color:'grey'}}>Register</Link>
              <Link to={'/createlist'} style={{textDecoration:'none',color:'grey'}}>Listing</Link>
              <Link to={'/wishList'} style={{textDecoration:'none',color:'grey'}}>Wishlist</Link>

         </div>
     
        


         {/* Contact */}
         <div className='d-flex flex-column mb-2'>
          <h5 className='text-dark'>Contacts</h5>
       <div className='d-flex flex-column mb-2'>
          <i class="fa-solid fa-phone"> phone +90388999</i>
          <i class="fa-solid fa-envelope">villa3241@gmail.com</i>
            
       </div>
        
          <div className='d-flex justify-content-between mt-2'>
              <a style={{textDecoration:'none',color:'black'}}  href="https://en.wikipedia.org/wiki/Twitter" target='_blank'><i class="fa-brands fa-twitter"></i></a>
              <a style={{textDecoration:'none',color:'black'}}  href="https://www.instagram.com/" target='_blank'><i class="fa-brands fa-instagram"></i></a>
              <a style={{textDecoration:'none',color:'black'}}  href="https://web.whatsapp.com/" target='_blank'><i class="fa-brands fa-whatsapp"></i></a>
              <a style={{textDecoration:'none',color:'black'}}  href="https://www.linkedin.com/in/shilpa-ts-90965722a/" target='_blank'><i class="fa-brands fa-linkedin"></i></a>
              <a style={{textDecoration:'none',color:'black'}}  href="https://github.com/" target='_blank'><i class="fa-brands fa-github"></i></a>
              <a style={{textDecoration:'none',color:'black'}}  href="https://en.wikipedia.org/wiki/Twitter" target='_blank'><i class="fa-solid fa-phone"></i></a>

          </div>
         </div>
      </div>
      <p className='text-center mt-3'>Copyright &copy; Dec 2024 © 2025 SmartVilla. All rights reserved.</p>
    {/* </div> */}
    </div>
  )
}

export default Footer