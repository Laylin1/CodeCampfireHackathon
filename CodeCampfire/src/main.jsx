import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './Components/MainPage/MainPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './Components/LoginForm/LoginForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/register' element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
