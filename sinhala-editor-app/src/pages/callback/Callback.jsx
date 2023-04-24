import {Flex, LoadingOverlay} from "@mantine/core";
import React, {useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";

export default function Callback() {
  const { logout } = useAuth0()
      useEffect(() => {
    const urlQueryParams = new URLSearchParams(
        window.location.search
    );
    if (urlQueryParams.has("error")) {
      console.log("Error")
      logout()
    }
  }, []);

  return (<Flex sx={{width: "100vw"}} >
    <LoadingOverlay
        loaderProps={{ size: 'lg', color: 'theme-green', variant: 'dots' }}
        overlayOpacity={0.3}
        overlayColor="#c5c5c5"
        visible
    />
  </Flex>)
}