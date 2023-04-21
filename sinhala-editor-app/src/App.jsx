import { useState } from 'react'
import logo from './assets/icon.svg'
import './App.css'
import {AppShell, MantineProvider, Navbar} from '@mantine/core'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Shell from "./components/app_shell/Shell.jsx";


function App() {

    return (
        <MantineProvider
      theme={{ fontFamily: "Lexend, sans-serif" }}
      withGlobalStyles
    >
            <Router>
                <Routes>
        <Route path="/">

            <Route index element={<Shell/>}/>
                <Route path="home" element={<Shell/>}/>


                </Route></Routes>
            </Router>
        </MantineProvider>
    )
}

export default App
