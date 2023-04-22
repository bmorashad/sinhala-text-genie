import {
    ActionIcon,
    Autocomplete,
    Box, Button, Chip,
    Container, CopyButton,
    Flex, Group, List,
    NumberInput,
    Paper,
    Select,
    SimpleGrid, Skeleton,
    Slider,
    Space,
    Tabs,
    Text, TextInput, ThemeIcon, Tooltip, useMantineTheme
} from "@mantine/core";
import {IconBallpen, IconCheck, IconCopy, IconRefresh} from "@tabler/icons-react";
import React, {useState} from "react";

export default function TextGenerator() {
    const [generating, setGenerating] = useState(false)
    const [generatorTexts, setGeneratorTexts] = useState([]);
    const [inputText, setInputTexts] = useState("")
    const onGenerate = () => {
        setGenerating(true)
        setTimeout(() => {
            setGenerating(false)
            setGeneratorTexts(['ලියන්න ලියන්න ලියන්න ලියන්න','යන්න ලියන්න ලියන්න' , 'නන \'න \' ' ])
        }, 1000)

    }


    return (
        <>

                <Text fw={700} fz={24}
                      color="blue.9"
                    // color="gray.8"
                >
                    Sinhala Text Generator
                </Text>
                <Space h="md"/>
                <Box size="sm">
                    <Text fw={400} fz="md"
                          color="gray.7"
                    >
                        <Container size={940} px={0} sx={{"margin": 0}}>
                            Generate beautiful Sinhala text with ease! Unleash your creativity with Sinhala!
                            <br/>
                            Type in Sinhala and watch the magic of text generation unfold before your eyes! Try it now.
                        </Container>
                    </Text>
                </Box>
                {/*<Divider my="xs" />*/}
                <Space h="md"/>
                <Paper shadow="xs" p="md" withBorder>
                    <SimpleGrid cols={3}>
                        <div>
                            <Text fw={500} size="sm"
                                  color={"gray.7"}
                            >Text length:</Text>
                            <Space h={4}/>
                            <Slider
                                // sx={{"width": "100%"}}
                                defaultValue={15}
                                size="sm"
                                thumbSize={18}
                                radius="xs"
                                min={3}
                                max={50}
                                marks={[
                                    { value: 25},
                                ]}
                                color={"blue"}
                            />
                        </div>
                    </SimpleGrid>
                    <Space h="sm"/>
                    <Flex
                        mih={50}
                        gap="md"
                        justify="flex-start"
                        align="center"
                        direction="row"
                        wrap="wrap"
                    >
                        <NumberInput
                            defaultValue={3}
                            placeholder="level"
                            max={20}
                            min={3}
                            // label="Diversity level:"
                            label={
                                <Text fw={500} color="gray.7">Number of predictions:</Text>
                            }
                        />
                    </Flex>
                    <Space h="md"/>
                    <TextInput
                        value={inputText}
                        onChange={(event) => setInputTexts(event.currentTarget.value)}
                        placeholder="සිංහලෙන් ලියන්න..."
                        size="md"
                    />
                    <Space h="md"/>
                    <Button leftIcon={<IconRefresh/>} onClick={onGenerate} loading={generating}>Generate</Button>
                    <Space h="md"/>

                    <Text fw={500} color="gray.7">Generated texts:</Text>
                    <Space h="md"/>
                    {generating && <>
                            <Skeleton height={15} width={"80%"} radius="xl" visible={generating}/>
                        <Space h="sm"/>
                            <Skeleton height={15} width={"80%"} radius="xl" visible={generating}/>
                        <Space h="sm"/>
                            <Skeleton height={15} width={"80%"} radius="xl" visible={generating}/>
                        <Space h="sm"/>
                            <Skeleton height={15} width={"80%"} radius="xl" visible={generating}/>
                    </>}

                    {
                        !generating &&
                        <List
                            spacing="xs"
                            size="md"
                            center
                            icon={
                                <ThemeIcon color="teal" size={24} radius="xl">
                                    <IconBallpen size="1rem" />
                                </ThemeIcon>
                            }
                        >
                            {generatorTexts.map((t, i) =>
                                (
                                    <Group key={"gen" + i}>
                                        <List.Item>{t}</List.Item>
                                        <CopyButton value={t} timeout={2000}>
                                            {({ copied, copy }) => (
                                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                                    <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                                                        {copied ? <IconCheck size="1.8rem" /> : <IconCopy size="1.8rem" />}
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
                                        </CopyButton>
                                        <Space h={35}/>
                                    </Group>

                                )
                            )}
                        </List>
                    }


                </Paper>

    </>
    )

}
