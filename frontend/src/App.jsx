import './App.css'
import config from "./config/config.json"
import {Center, Flex, Loader, LoadingOverlay, MantineProvider} from '@mantine/core'
import {BrowserRouter as Router, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Shell, {withShell} from "./components/app_shell/Shell.jsx";
import TextGenerator from "./pages/textgen/TextGenerator.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import Error from "./pages/error/Error.jsx";
import {Notifications} from "@mantine/notifications";
import NextWordPredictor from "./pages/wordpredictor/NextWordPredictor.jsx";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import React from "react";
import {protectPage} from "./components/security/ProtectPage.jsx";
import Callback from "./pages/callback/Callback.jsx";
import LogOut from "./pages/logout/LogOut.jsx";

function RoutesWithAuth0Provider() {
  const navigate = useNavigate()
  const onRedirectCallback = (appState) => {
    let returnTo = "/"
    let appStateDecoded = JSON.parse(decodeURIComponent(appState))
    if (appStateDecoded.visitedPath) {
      returnTo = appStateDecoded.visitedPath
    }
    navigate(returnTo);
  };

  return (<Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        audience: import.meta.env.VITE_AUDIENCE
      }}
      onRedirectCallback={onRedirectCallback}

  >
    <Routes>
      <Route path="/">
        <Route index element={<Navigate replace to="/nextword"/>}/>
        <Route path="logout" element={<LogOut/>}/>
        <Route path="nextword" element={protectPage(withShell(<NextWordPredictor/>))}/>
        <Route path="textgen" element={protectPage(withShell(<TextGenerator/>))}/>
        <Route path="callback" element={<Callback/>}/>
        <Route path="*" element={<NotFound/>}/>

      </Route>
    </Routes>
  </Auth0Provider>)

}


function App() {

  return (
      <MantineProvider
          theme={{
            fontFamily: "Lexend, sans-serif",
            colors: {
              'theme-green': ["#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B", "#02887B"]
            }
          }}
          withGlobalStyles
      >
        <Notifications position={"top-center"}/>
        <Router>
          <RoutesWithAuth0Provider/>
        </Router>
      </MantineProvider>
  )
}


export default App
