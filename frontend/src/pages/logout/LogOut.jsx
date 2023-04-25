import {Flex, LoadingOverlay} from "@mantine/core";
import React, {useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate()
  useEffect(() => {
    const urlQueryParams = new URLSearchParams(
        window.location.search
    );
    const redirectTo = urlQueryParams.get("redirectTo")
    if (redirectTo) {
      navigate(redirectTo)
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
