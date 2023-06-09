import {
  ActionIcon,
  Badge,
  Box,
  Button, Card, Center,
  Chip,
  Container,
  CopyButton,
  Flex,
  Group, NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Skeleton,
  Slider,
  Space,
  Text,
  TextInput, Tooltip
} from "@mantine/core";
import {IconRefresh, IconReload, IconX} from "@tabler/icons-react";
import React, {useState} from "react";
import {generateNextWordPairs, generateNextWords} from "../../services/text-generator.js";
import {notifications} from "@mantine/notifications";
import {useAuth0} from "@auth0/auth0-react";
import {isInputTextValid} from "../../utils/validator.js";
import Samples from "../../components/sample_sentences/Samples.jsx";

export default function NextWordPredictor() {
  const PREDICTION_TYPES = [
    {value: 'single', label: 'Single Word'},
    {value: 'pair', label: 'Word Pair'},
  ]
  const PREDICTION_MODES = [
    {value: 'consistent', label: 'Consistent'},
    {value: 'diverse', label: 'Diverse'},
  ]
  const [generating, setGenerating] = useState(false)
  const [selectedWordIdx, setSelectedWordIdx] = useState()
  const [nextWords, setNextWords] = useState([])
  const [predictionMode, setPredictionMode] = useState(PREDICTION_MODES[0].value)
  const [predictionType, setPredictionType] = useState(PREDICTION_TYPES[0].value)
  const [inputText, setInputText] = useState('');
  const [diversityLevel, setDiversityLevel] = useState(50)
  const [numOfWords, setNumOfWords] = useState(3)

  const onWordSelect = (idx) => {
    setSelectedWordIdx(idx)
  }
  const { getAccessTokenSilently } = useAuth0()

  const getWordPairs = async ({options, token}) => {
    const res = await generateNextWordPairs({options, token})
    return res.data["word_pairs"]
  }

  const getNextWords = async ({options ,token}) => {
    const res = await generateNextWords({options, token})
    return res.data["next_words"]
  }

  const onGenerate = async () => {
    setGenerating(true)
    let token = await getAccessTokenSilently()
    try {
      let predictionOptions = {
        prompt: inputText.trim(),
        prediction_mode: predictionMode,
        diversity_level: diversityLevel,
      }
      let generatedWords
      if (predictionType === PREDICTION_TYPES[0].value) {
        predictionOptions = {
          ...predictionOptions,
          max_num_of_words: numOfWords
        }
        generatedWords = await getNextWords({options: predictionOptions, token})
      } else {
        predictionOptions = {
          ...predictionOptions,
          max_num_of_pairs: numOfWords
        }
        generatedWords = await getWordPairs({options: predictionOptions, token})
      }
      setGenerating(false)
      setNextWords(generatedWords)
      setSelectedWordIdx(-1)
    } catch (e) {
      console.error(e.message)
      notifications.show({
        title: 'Error occurred while predicting next words',
        message: e.response ? e.response.data.detail.message : e.message,
        withCloseButton: true,
        color: "red",
        icon: <IconX/>,
        autoClose: 3000,
        withBorder: true

      })
      setNextWords([])
      setGenerating(false)
    }
  }

  return (
      <>
        <Text fw={700} fz={24}
              color="blue.9"
            // color="gray.8"
        >
          Sinhala Next Word Predictor
        </Text>
        <Space h="md"/>
        <Box size="sm">
          <Text fw={400} fz="md"
                color="gray.7"
          >
            <Container size={940} px={0} sx={{"margin": 0}}>
              Simply start typing in Sinhala and it will automatically suggest the next word or word pair.
              Just press the space bar and wait for the predictions to appear.
              Say goodbye to typos and writer's block, and start typing with ease today!
            </Container>
          </Text>
        </Box>
        <Space h="md"/>
        <Samples onClick={setInputText}/>
        <Space h="md"/>
        <Paper shadow="xs" p="md" withBorder>
          {/*<Space h="xs"/>*/}
          <Flex
              mih={50}
              gap="md"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
          >
            <Select
                label={
                  <Text fw={500} color="gray.7">Prediction type:</Text>
                }
                placeholder="type"
                width="sm"
                data={PREDICTION_TYPES}
                onChange={setPredictionType}
                defaultValue={predictionMode}
                value={predictionType}
            />
            <Select
                label={
                  <Text fw={500} color="gray.7">Prediction mode:</Text>
                }
                placeholder="mode"
                width="sm"
                data={PREDICTION_MODES}
                defaultValue={predictionMode}
                value={predictionMode}
                onChange={setPredictionMode}
            />
            <NumberInput
                value={numOfWords}
                onChange={setNumOfWords}
                defaultValue={3}
                placeholder="level"
                max={20}
                min={3}
                // label="Diversity level:"
                label={
                  <Text fw={500} color="gray.7">Number of words:</Text>
                }
            />
          </Flex>
          <Space h="sm"/>
          <SimpleGrid cols={3}>
            <div>
              <Text fw={500} size="sm"
                    color={predictionMode === PREDICTION_MODES[0].value ? "gray.6" : "gray.7"}
              >Diversity level:</Text>
              <Space h={4}/>
              <Slider
                  // sx={{"width": "100%"}}
                  value={diversityLevel}
                  onChange={setDiversityLevel}
                  defaultValue={50}
                  size="sm"
                  thumbSize={18}
                  radius="xs"
                  min={10}
                  max={100}
                  marks={[
                    {value: 50},
                  ]}
                  disabled={predictionMode === PREDICTION_MODES[0].value}
              />
            </div>
          </SimpleGrid>
          <Space h="md"/>
          <TextInput
              value={inputText}
              onChange={(event) => {
                setInputText(event.currentTarget.value)
              }}
              placeholder="සිංහලෙන් ලියන්න..."
              size="md"
              onKeyUp={(e) => {
                if(e.key === "Enter" && isInputTextValid(inputText)) {
                  onGenerate()
                }
              }}
              error={isInputTextValid(inputText) ? "" : "Phrase must not exceed 15 words!"}
               rightSection={
            <IconX cursor={"pointer"} size="1.2rem" style={{ display: 'block', opacity: 0.3 }} onClick={() => {setInputText("")}}/>
      }
          />
          <Space h="md"/>
          <Button leftIcon={<IconRefresh/>} onClick={() => onGenerate()} loading={generating}
                  disabled={!isInputTextValid(inputText)} variant={"filled"}>
            Predict
          </Button>
          <Space h="md"/>
          <Text fw={500} color="gray.7">Predicted words:</Text>
          <Space h="sm"/>
          {generating && <>
            <Group spacing={5}>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
            </Group>
            <Space h={5}/>
            <Group spacing={5}>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
              <Skeleton height={15} width={"15%"} radius="sm" visible={generating}/>
            </Group>
          </>}

          {
              !generating &&
              <Container size={1300} px={0} sx={{"margin": 0}}>
              <Chip.Group multiple={false} value={selectedWordIdx} onChange={onWordSelect}>
                <Group position="left" spacing={12}>
                  {
                    nextWords.map((p, i) => (
                        <CopyButton key={"chip" + i} value={p}>
                          {({_, copy}) => (
                              <Chip size={"md"} value={`${i}`} onClick={copy}>{p}</Chip>
                          )}
                        </CopyButton>
                    ))

                  }
                </Group>
              </Chip.Group>
              </Container>
          }
        </Paper>
  </>

  )
}