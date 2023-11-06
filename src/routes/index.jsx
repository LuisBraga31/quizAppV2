import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import DetailQuestion from '../pages/DetailQuestion';

export function RouteList() {
  return (
    <>
      <BrowserRouter>

        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/:tag/:id" element={<DetailQuestion />} /> 
        </Routes>
        
      </BrowserRouter>
    
    </>
  )
}