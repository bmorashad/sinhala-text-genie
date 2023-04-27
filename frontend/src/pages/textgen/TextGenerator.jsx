import {
    ActionIcon,
    Box,
    Button,
    Container,
    CopyButton,
    Flex,
    Group,
    List,
    NumberInput,
    Paper,
    SimpleGrid,
    Skeleton,
    Slider,
    Space,
    Text,
    TextInput,
    ThemeIcon,
    Tooltip
} from "@mantine/core";
import {IconBallpen, IconCheck, IconCopy, IconRefresh, IconX} from "@tabler/icons-react";
import React, {useState} from "react";
import {generateTexts} from "../../services/text-generator.js";
import {notifications} from "@mantine/notifications";
import {useAuth0} from "@auth0/auth0-react";
import {isInputTextValid} from "../../utils/validator.js";

export default function TextGenerator() {
  const [generating, setGenerating] = useState(false)
  const [generatorTexts, setGeneratorTexts] = useState([]);
  const [textLength, setTextLength] = useState(15);
  const [numOfPreds, setNumOfPreds] = useState(3);
  const [inputText, setInputTexts] = useState("")
  const { getAccessTokenSilently } = useAuth0()
  const onGenerate = async () => {
    setGenerating(true)
    let token = await getAccessTokenSilently()
    try {
      const textGenOptions = {
        prompt: inputText.trim(),
        max_num_of_generations: numOfPreds,
        max_gen_len: textLength,
      }
      const res = await generateTexts({options: textGenOptions, token})
      const generatedTexts = res.data["generated_texts"]
      setGenerating(false)
      setGeneratorTexts(generatedTexts)
    } catch (e) {
      console.error(e.message)
      notifications.show({
        title: 'Error occurred while generating texts',
        message: e.response ? e.response.data.detail.message : e.message,
        withCloseButton: true,
        color: "red",
        icon: <IconX/>,
        autoClose: 3000,
        withBorder: true

      })
      setGeneratorTexts([])
      setGenerating(false)
    }
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
                  value={textLength}
                  onChange={setTextLength}
                  defaultValue={15}
                  size="sm"
                  thumbSize={18}
                  radius="xs"
                  min={3}
                  max={30}
                  marks={[
                    {value: 25},
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
                value={numOfPreds}
                onChange={setNumOfPreds}
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
              onKeyUp={(e) => {
                if(e.key === "Enter" && isInputTextValid(inputText)) {
                  onGenerate()
                }
              }}
              error={isInputTextValid(inputText) ? "" : "Phrase must not exceed 15 words!"}
          />
          <Space h="md"/>
          <Button leftIcon={<IconRefresh/>} onClick={onGenerate} loading={generating} disabled={!isInputTextValid(inputText)}>
            Generate
          </Button>
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
                      <IconBallpen size="1rem"/>
                    </ThemeIcon>
                  }
              >
                {generatorTexts.map((t, i) =>
                    (
                        <Group key={"gen" + i}>
                          <Flex align={"flex-start"} gap={20}>
                            <Container size={1300} px={0} sx={{"margin": 0}}>
                              <List.Item><Text>{t}</Text></List.Item>
                            </Container>
                            <CopyButton value={t} timeout={2000}>
                              {({copied, copy}) => (
                                  <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                    <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                                      {copied ? <IconCheck size="1.8rem"/> :
                                          <IconCopy size="1.8rem"/>}
                                    </ActionIcon>
                                  </Tooltip>
                              )}
                            </CopyButton>
                            <Space h={25}/>
                          </Flex>
                        </Group>

                    )
                )}
              </List>
          }


        </Paper>

      </>
  )

}

