import './App.css'
import {Center, Flex, Loader, LoadingOverlay, MantineProvider} from '@mantine/core'
import {BrowserRouter as Router, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Shell, {withShell} from "./components/app_shell/Shell.jsx";
import TextGenerator from "./pages/textgen/TextGenerator.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import {Notifications} from "@mantine/notifications";
import NextWordPredictor from "./pages/wordpredictor/NextWordPredictor.jsx";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import React from "react";
import {protectPage} from "./components/security/ProtectPage.jsx";
import Callback from "./pages/callback/Callback.jsx";

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
      domain="dev-1g2o651ytyqw7ld6.us.auth0.com"
      clientId="FApXnoAxjW1qGSjK13KrVclqElefp0oU"
      authorizationParams={{
        redirect_uri: window.location.origin + "/callback"
      }}
      onRedirectCallback={onRedirectCallback}

  >
    <Routes>
      <Route path="/">
        <Route index element={<Navigate replace to="/nextword"/>}/>
        <Route path="logout" element={<Navigate replace to={"/"}/>}/>
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
