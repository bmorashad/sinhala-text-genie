import {Flex, LoadingOverlay} from "@mantine/core";
import React from "react";

export default function Callback() {

  return (<Flex sx={{width: "100vw"}} >
    <LoadingOverlay
        loaderProps={{ size: 'lg', color: 'theme-green', variant: 'dots' }}
        overlayOpacity={0.3}
        overlayColor="#c5c5c5"
        visible
    />
  </Flex>)
}