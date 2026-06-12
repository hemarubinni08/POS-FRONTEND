import { useState } from 'react'
import React from 'react';
import Header from "./components/Header"
import Login from './components/Login';
import Register from './components/Register';
import './App.css'

function App() {

  return (
    <>
      <div>
        <Header />
      </div>
      <div className='login-container'><Login /></div>
      <div className='register-container'><Register /></div>
    </>
  )
}

export default App;
