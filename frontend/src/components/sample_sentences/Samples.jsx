import {ActionIcon, Badge, Card, Chip, Container, CopyButton, Group, Skeleton, Space, Tooltip} from "@mantine/core";
import {IconReload, IconX} from "@tabler/icons-react";
import React, {useEffect, useState} from "react";
import {generateRandomTexts, generateTexts} from "../../services/text-generator.js";
import {notifications} from "@mantine/notifications";
import {useAuth0} from "@auth0/auth0-react";

export default function Samples({onClick}) {
  const NUM_OF_SAMPLES = 6
  const SAMPLE_LEN = 6
  const { getAccessTokenSilently } = useAuth0()
  const [randomTextList, setRandomTextList] = useState([])
  const [reloading, setReloading] = useState(false)

  useEffect(() => {
    reload()
  },[])
  const reload = async () => {
    setReloading(true)
    let token = await getAccessTokenSilently()
    try {
      const options = {
        num_of_texts: NUM_OF_SAMPLES,
        len: SAMPLE_LEN,
      }
      const res = await generateRandomTexts({options: options, token})
      const generatedTexts = res.data["text_list"]
      setReloading(false)
      setRandomTextList(generatedTexts)
    } catch (e) {
      console.error(e.message)
      notifications.show({
        title: 'Error occurred while loading examples',
        message: e.response ? e.response.data.detail.message : e.message,
        withCloseButton: true,
        color: "red",
        icon: <IconX/>,
        autoClose: 3000,
        withBorder: true

      })
      setRandomTextList([])
      setReloading(false)
    }
  }
  return (
      <Card padding="sm" radius="md" withBorder color={"dimmed"} bg={"gray.0"}>
        <Group spacing={3}>
          <Badge color="teal.8" variant="light" radius={"xl"}>
            Examples
          </Badge>
            <ActionIcon variant="transparent" size={"sm"} color={"gray.6"} radius={"xl"} loading={reloading}
                        onClick={reload}
            >
              <Tooltip label={"Reload"} position={"right-end"} zIndex={999}>
              <IconReload size={"1.2rem"} color={"gray"}/>
              </Tooltip>
            </ActionIcon>
        </Group>

        <Space h="md"/>
        <Container size={1300} px={0} sx={{"margin": 0}}>
          {false && <>
            <Group spacing={5}>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
              <Skeleton height={15} width={"25%"} radius="sm" visible={true}/>
            </Group>
          </>}
          {true && <Chip.Group multiple={false} value={-1} >
            <Group position="left" spacing={12}>
              {
                randomTextList.map((p, i) => (
                    <CopyButton key={"chip" + i} value={p}>
                      {({_, copy}) => (
                          <Chip size={"md"} value={`${i}`} onClick={(value) => {
                            copy()
                            onClick(p)
                          }}
                                variant={"light"}
                                color={"blue"}
                          >
                            {p}
                          </Chip>
                      )}
                    </CopyButton>
                ))

              }
            </Group>
          </Chip.Group>}
        </Container>
        {/*</Group>*/}
      </Card>
  )

}