import React, { useEffect } from 'react'
import Router from './routes'
import Aos from 'aos'
import 'aos/dist/aos.css'
const App = () => {
  useEffect(() => {
    Aos.init({ duration: 600 })
  }, [])
  return <Router />
}

export default App
