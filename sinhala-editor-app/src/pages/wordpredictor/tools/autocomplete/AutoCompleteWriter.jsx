import {
    Autocomplete,
    Box,
    Container,
    Flex, Loader,
    NumberInput,
    Paper,
    Select,
    SimpleGrid,
    Slider,
    Space,
    Text
} from "@mantine/core";
import React, {useRef, useState} from "react";

export default function AutoCompleteWriter() {
    const [autoCompleteText, setAutoCompleteText] = useState('');
    const [autoCompleteLoading, setAutoCompleteLoading] = useState(false)
    const data =
        autoCompleteText.trim().length > 0 && !autoCompleteText.includes(' ')
            ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${autoCompleteText}@${provider}`)
            : [];

    let [predictionMode, setPredictionMode] = useState("consistent")
    const [predictions, setPredictions] = useState([])

    const timeoutRef = useRef(-1);
    const onTextInput = (value) => {

       window.clearTimeout(timeoutRef.current);
    setAutoCompleteText(value);
    // setPredictions([]);

    if (value.trim().length === 0) {
      setAutoCompleteLoading(false);
    } else {
      setAutoCompleteLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setAutoCompleteLoading(false);
        setPredictions(
          ['ලියන්න','යන්න', 'න' ].map(
            (provider) => `${provider}adkfjdaflkj${value}`
          )
        );
      }, 1000);
    } 
    }

    return (
        <>
            <Text fw={700} fz={24}
                  color="blue.9"
                // color="gray.8"
            >
                Start typing
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
                <Autocomplete
                    value={autoCompleteText}
                    onChange={onTextInput}
                    placeholder="සිංහලෙන් ලියන්න..."
                    data={predictions}
                    size="md"
                    rightSection={autoCompleteLoading ? <Loader size={16} /> : null}

                />
            </Paper>
        </>

    )
}
