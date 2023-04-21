import { useState } from 'react'
import logo from './assets/icon.svg'
import './App.css'
import {AppShell, MantineProvider, Navbar} from '@mantine/core'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Shell from "./components/app_shell/Shell.jsx";
import TextGenerator from "./pages/textgen/Text Generator.jsx";
import WordPredictor from "./pages/wordpredictor/WordPredictor.jsx";


function App() {

    return (
        <MantineProvider
      theme={{ fontFamily: "Lexend, sans-serif" }}
      withGlobalStyles
    >
            <Router>
                <Routes>
        <Route path="/">

            {/*<Route index element={<Shell/>}/>*/}
            <Route path="nextword" element={<Shell><WordPredictor/></Shell>}/>
            <Route path="textgen" element={<Shell><TextGenerator/></Shell>}/>

                </Route>
                    </Routes>
            </Router>
        </MantineProvider>
    )
}

export default App
