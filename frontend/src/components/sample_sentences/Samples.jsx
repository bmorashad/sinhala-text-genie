import {ActionIcon, Badge, Card, Chip, Container, CopyButton, Group, Skeleton, Space, Tooltip} from "@mantine/core";
import {IconReload} from "@tabler/icons-react";
import React from "react";

export default function Samples({onClick}) {
  return (
      <Card padding="sm" radius="md" withBorder color={"dimmed"} bg={"gray.0"}>
        <Group spacing={3}>
          <Badge color="teal.8" variant="light" radius={"xl"}>
            Examples
          </Badge>
          <Tooltip label={"Reload"} position={"top"}>
            <ActionIcon variant="transparent" size={"sm"} color={"gray.6"} radius={"xl"} loading={false}>
              <IconReload size={"1.2rem"}/>
            </ActionIcon>
          </Tooltip>
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
                ["මගේ තනතුර උසස්", "ඕවා ගෙනාවේ නැහැ කියලා අපේ නම් කිසිම අමනාපයක්",
                  "අපේ නම් කිසිම අමනාපයක්", "මිනිස්සු මුළු ජීවිත කාලයම ඉන්න බයෙන්"].map((p, i) => (
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