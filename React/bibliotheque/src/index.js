import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import HomeClient from './components/Client/Home/HomeClient.jsx';
import HomeEmploye from './components/Employe/Home/HomeEmploye.jsx'
import HomeAdmin from './components/Admin/Home/HomeAdmin.jsx'
import SearchDocuments from './components/Client/SearchDocuments/SearchDocuments';
import BorrowDocuments from './components/Client/BorrowDocuments/BorrowDocuments';
import Bills from './components/Client/Bills/Bills';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/client/home' element={<HomeClient />}/>
        <Route path='/client/searchDocuments' element={<SearchDocuments />}/>
        <Route path='/client/borrowDocs' element={<BorrowDocuments />}/>
        <Route path='/client/bills' element={<Bills />}/>
        <Route path='/employe/home' element={<HomeEmploye />}/>
        <Route path='/admin' element={<HomeAdmin />}/>
        <Route path='/client/deconnect' element={<App />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
