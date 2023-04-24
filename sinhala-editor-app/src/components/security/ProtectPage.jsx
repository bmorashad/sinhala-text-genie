import {useAuth0} from "@auth0/auth0-react";
import {LoadingOverlay} from "@mantine/core";
import React from "react";

export const ProtectedRoute = ({children}) => {
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

export const protectPage = (page) => {
  return (<ProtectedRoute>
    {page}
  </ProtectedRoute>)

}
