import React, { Fragment, useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { createTheme } from '@mui/material'
import { themeSettings } from './theme'
// components
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
// pages
import Login from './pages/Login'

function App() {
  const theme = useMemo(() => createTheme(themeSettings(), []))
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </Fragment>
  )
}

export default App
