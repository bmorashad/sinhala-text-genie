import {Button, Code, Container, createStyles, Flex, Group, Space, Text, Title,} from "@mantine/core";
import React from "react";
import {Link} from "react-router-dom";

const useStyles = createStyles((theme) => ({
  err_root: {
    paddingTop: 80,
    paddingBottom: 80,
    margin: 'auto',
    maxWidth: '100rem'
  },

  error_label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 60,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
        theme.colorScheme === "dark"
            ? theme.colors.red[0]
            : theme.colors.red[5],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  err_title: {
    fontFamily: `${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 28,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  err_description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
  err_config: {
    fontSize: 14,
  }
}));

export default function Error() {
  const {classes} = useStyles();

  return (
      <Flex align={"center"} justify={"center"} sx={{"width": "100vw"}}>
        <Container className={classes.err_root}>
          <div className={classes.error_label}>Auth0 Not Configured</div>
          <Space h={"lg"}/>
          <Title className={classes.err_title} color={"gray.6"}>You have not configured oauth.</Title>
          <Text
              color="dimmed"
              size="lg"
              align="center"
              className={classes.err_description}
          >
            Add required Auth0 configs to .env file and restart.
          </Text>
          <Space h={"xl"}/>
          <Text align={"center"} color={"dimmed"} size={"sm"}>
            Required configs
          </Text>
          <Flex justify={"center"}>
          <Code m={"auto"} color={"red"} className={classes.err_config}>
            {`{domain=<YOUR_DOMAIN>, clientId=<YOUR_CLIENT_ID>}`}
          </Code>
          </Flex>
          <Group position="center">
            <Link to={"https://auth0.com/"} >
              <Button variant="subtle" size="md">
                Learn more about Auth0
              </Button>
            </Link>
          </Group>
        </Container>
      </Flex>
  );
}
