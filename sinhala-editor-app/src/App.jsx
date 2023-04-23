import { useState } from 'react'
import logo from './assets/icon.svg'
import './App.css'
import {AppShell, MantineProvider, Navbar} from '@mantine/core'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Shell from "./components/app_shell/Shell.jsx";
import TextGenerator from "./pages/textgen/TextGenerator.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import {Notifications} from "@mantine/notifications";
import NextWordPredictor from "./pages/wordpredictor/NextWordPredictor.jsx";


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
<Notifications position={"top-center"}/>
            <Router>
                <Routes>
        <Route path="/">

            <Route index element={<Navigate replace to="/nextword" />}/>
            <Route path="nextword" element={<Shell><NextWordPredictor/></Shell>}/>
            <Route path="textgen" element={<Shell><TextGenerator/></Shell>}/>
            <Route path="*" element={<NotFound/>}/>


                </Route>
                    </Routes>
            </Router>
        </MantineProvider>
    )
}

export default App
