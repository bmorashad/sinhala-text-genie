import {
    Box, Button, Chip,
    Container, CopyButton,
    Flex, Group,
    NumberInput,
    Paper,
    Select,
    SimpleGrid, Skeleton,
    Slider,
    Space,
    Text,
    TextInput
} from "@mantine/core";
import {IconRefresh} from "@tabler/icons-react";
import React, {useState} from "react";

export default function Generator() {
    const [generating, setGenerating] = useState(false)
    const [selectedWordIdx, setSelectedWordIdx] = useState()
    const [predictions, setPredictions] = useState([])
    let [predictionMode, setPredictionMode] = useState("consistent")

    const onWordSelect = (idx) => {
        setSelectedWordIdx(idx)
    }
    const onGenerate = () => {
        setGenerating(true)
        setTimeout(() => {
            setGenerating(false)
            setPredictions(['ලියන්න','යන්න', 'න' ])
        }, 1000)

    }
    const [generatorText, setGeneratorText] = useState('');
    return (
<>
        <Text fw={700} fz={24}
              color="blue.9"
            // color="gray.8"
        >
            Type Sinhala & click generate
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
    {/*<Divider my="xs" />*/}
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
                // label="Prediction type:"
                label={
                    <Text fw={500} color="gray.7">Prediction type:</Text>
                }
                placeholder="type"
                defaultValue="single"
                width="sm"
                data={[
                    { value: 'single', label: 'Single Word' },
                    { value: 'pair', label: 'Word Pair' },
                ]}/>
            <Select
                // label="Prediction mode:"
                label={
                    <Text fw={500} color="gray.7">Prediction mode:</Text>
                }
                placeholder="mode"
                defaultValue={predictionMode}
                width="sm"
                data={[
                    { value: 'consistent', label: 'Consistent' },
                    { value: 'diverse', label: 'Diverse' },
                ]}
                onChange={setPredictionMode}
            />
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
        <Space h="sm"/>
        <SimpleGrid cols={3}>
            <div>
                <Text fw={500} size="sm"
                      color={predictionMode === "consistent" ? "gray.6" : "gray.7"}
                >Diversity level:</Text>
                <Space h={4}/>
                <Slider
                    // sx={{"width": "100%"}}
                    defaultValue={50}
                    size="sm"
                    thumbSize={18}
                    radius="xs"
                    min={10}
                    max={100}
                    marks={[
                        { value: 50},
                    ]}
                    disabled={predictionMode === "consistent"}
                />
            </div>
        </SimpleGrid>
        <Space h="md"/>
        <TextInput
            value={generatorText}
            onChange={(event) => setGeneratorText(event.currentTarget.value)}
            placeholder="සිංහලෙන් ලියන්න..."
            size="md"
        />
        <Space h="md"/>
        <Button leftIcon={<IconRefresh/>} onClick={() => onGenerate()} loading={generating}>
            Generate
        </Button>
        <Space h="md"/>
        <Text fw={500} color="gray.7">Predicted words:</Text>
        <Space h="sm"/>
        {generating && <>
            <Group>
                <Skeleton height={20} width={"20%"} radius="xl" visible={generating}/>
                <Skeleton height={20} width={"20%"} radius="xl" visible={generating}/>
                <Skeleton height={20} width={"20%"} radius="xl" visible={generating}/>
                <Skeleton height={20} width={"20%"} radius="xl" visible={generating}/>
            </Group>
            <Space h={5}/>
            <Group>
                <Skeleton height={20} width={"20%"} radius="xl" visible={generating}/>
                <Skeleton height={20} width={"20%"} radius="xl" visible={generating}/>
                <Skeleton height={20} width={"20%"} radius="xl" visible={generating}/>
                <Skeleton height={20} width={"20%"} radius="xl" visible={generating}/>
            </Group>
        </>}

        {
            !generating &&
            <Chip.Group multiple={false} value={selectedWordIdx} onChange={onWordSelect}>
                <Group position="left">
                    {
                        predictions.map((p, i) => (
                            <CopyButton key={"chip" + i} value={p}>
                                {({copied, copy}) => (
                                    <Chip  size={"md"} value={`${i}`} onClick={copy}>{p}</Chip>
                                )}
                            </CopyButton>
                        ))

                    }
                </Group>
            </Chip.Group>
        }
    </Paper>
    </>

)
}

