import { useState } from 'react'
import logo from './assets/icon.svg'
import './App.css'
import {AppShell, MantineProvider, Navbar} from '@mantine/core'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Shell from "./components/app_shell/Shell.jsx";
import TextGenerator from "./pages/textgen/TextGenerator.jsx";
import WordPredictor from "./pages/wordpredictor/WordPredictor.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";


function App() {

    return (
        <MantineProvider
      theme={{ fontFamily: "Lexend, sans-serif",
          colors: {
              'theme-green': ["#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B"]
          }
        }}
      withGlobalStyles
    >
            <Router>
                <Routes>
        <Route path="/">

            <Route index element={<Navigate replace to="/nextword" />}/>
            <Route path="nextword" element={<Shell><WordPredictor/></Shell>}/>
            <Route path="textgen" element={<Shell><TextGenerator/></Shell>}/>
            <Route path="*" element={<NotFound/>}/>


                </Route>
                    </Routes>
            </Router>
        </MantineProvider>
    )
}

export default App
