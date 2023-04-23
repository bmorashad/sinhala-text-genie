import './App.css'
import {Center, Flex, Loader, LoadingOverlay, MantineProvider} from '@mantine/core'
import {BrowserRouter as Router, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Shell from "./components/app_shell/Shell.jsx";
import TextGenerator from "./pages/textgen/TextGenerator.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import {Notifications} from "@mantine/notifications";
import NextWordPredictor from "./pages/wordpredictor/NextWordPredictor.jsx";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import React from "react";

function RoutesWithAuth0Provider() {
  const navigate = useNavigate()
  const onRedirectCallback = (appState) => {
    let returnTo = "/"
     if (appState) {
       returnTo = appState
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
        <Route path="logout" element={<Navigate replace to={"/nextword"}/>}/>
        {/*<Route path="callback" element={<Navigate replace to={"/nextword"}/>}/>*/}
        <Route path="nextword" element={protectPage(<Shell><NextWordPredictor/></Shell>)}/>
        <Route path="textgen" element={protectPage(<Shell><TextGenerator/></Shell>)}/>
        <Route path="callback" element={<Flex sx={{width: "100vw"}} >
              <LoadingOverlay
      loaderProps={{ size: 'lg', color: 'theme-green', variant: 'dots' }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible
    />
        </Flex>}/>
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

const ProtectedRoute = ({children}) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const appState = window.location.pathname

  const options = {
    appState: appState
  }
  if (!isLoading && !isAuthenticated) {
    loginWithRedirect(options)
    return (<LoadingOverlay
        loaderProps={{ size: 'lg', color: 'theme-green', variant: 'dots' }}
        visible={true}/>)
  }

  return (
      <>
        <LoadingOverlay visible={isLoading}
                        loaderProps={{ size: 'lg', color: 'theme-green', variant: 'dots' }}
        ></LoadingOverlay>
        {children}
      </>

  )
}

const protectPage = (page) => {
  return (<ProtectedRoute>
    {page}
  </ProtectedRoute>)

}


export default App
