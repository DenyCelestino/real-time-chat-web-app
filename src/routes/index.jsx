import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from '../pages/Chat'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
