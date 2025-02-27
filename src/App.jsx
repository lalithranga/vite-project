
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Admin from './Pages/Admin/Admin'
import Login from './Pages/Login/login';
import toast, { Toaster } from 'react-hot-toast';
import User from './register/user';

import HomePage from './Pages/Home/homepage';
import Testing from './Pages/testing';


function App() {
  


  return (
    
    <>
  <BrowserRouter>
  <Toaster position="top-center"  reverseOrder={false} />
 
  
    <Routes path="/*">
      <Route path="/*" element={<HomePage/>} />
      <Route path="/Admin/*" element={<Admin />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/register/*" element={<User />} />
      <Route path="/testing" element={<Testing/>} />
     
    </Routes>
  
  </BrowserRouter>

     </>
  )
}

export default App
