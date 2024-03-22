import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Index from './componets/Index';
import Show from './componets/Show';
import Edit from './componets/Edit';
import Create from './componets/Create';


import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AuthProvider>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index></Index>}></Route>
        <Route path='/show' element={<Show></Show>}></Route>
        <Route path='/create' element={<Create></Create>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
      </Routes>
     </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;
