import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import DetailQuestion from '../pages/DetailQuestion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export function RouteList() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      
        <Routes>
          
            <Route path="/" element={<Home />} /> 
            <Route path="/:tag" element={<DetailQuestion />} /> 
          
        </Routes>
      
      <Footer/> 
      </BrowserRouter>
    
    </>
  )
}