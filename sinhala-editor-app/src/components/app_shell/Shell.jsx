import React, { useState } from 'react';
import {
    Tabs,
    Avatar,
    Group,
    Title,
    Space,
    NumberInput,
    Paper,
    Divider,
    Container,
    SimpleGrid,
    Slider,
    SegmentedControl,
    Input,
    TextInput,
    Button,
    Chip,
    LoadingOverlay,
    Loader,
    Center,
    Skeleton,
    ThemeIcon,
    List,
    CopyButton, Tooltip, ActionIcon
} from '@mantine/core';
import { Flex } from '@mantine/core';
import { Autocomplete, Select } from '@mantine/core';
import {
    Box,
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    NavLink,
    useMantineTheme,
} from '@mantine/core';
import logo from '../../assets/icon.svg'
import {
    IconWriting,
    IconCursorText,
    IconSettings,
    IconRefresh,
    IconCircleCheck,
    IconCircleDashed,
    IconTextPlus, IconBallpen, IconCheck, IconCopy
} from '@tabler/icons-react';

export default function Shell() {
    const texts = [
        "Clone or download repository from GitHub",
        "Clone or download",
        "Clone or download repository",
        "Clone or download repository from GitHub",
    ]
    const [generating, setGenerating] = useState(true)
    const [autoCompleteText, setAutoCompleteText] = useState('');
    const [generatorText, setGeneratorText] = useState('');
    const [writerMode, setWriterMode] = useState('autocomplete');
    const data =
        autoCompleteText.trim().length > 0 && !autoCompleteText.includes(' ')
            ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${provider}`)
            : [];

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    let [predictionMode, setPredictionMode] = useState("consistent")
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    {/* <Box w={240}> */}
                    <NavLink href="" label="Word Predictor" color="blue.7" active="true" icon={<IconCursorText stroke={1.5} />}/>
                    <NavLink href="" label="Text Generator" color="blue.7" icon={<IconWriting stroke={1.5} />}/>

                    {/* </Box> */}

                </Navbar>
            }
            // footer={
            //   <Footer height={60} p="md">
            //     Sinhala text editor app @ Alrights
            //   </Footer>
            // }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <Group>
                            <Avatar radius="xs" src={logo} alt="logo"/>
                            <Text color="blue.9" order={4} fw={700}>SinhalaTextGenie</Text>
                        </Group>

                    </div>
                </Header>
            }
        >
           <Tabs defaultValue="generator" color={"pink"}>
      <Tabs.List>
        <Tabs.Tab value="autocomplete" >AutoComplete</Tabs.Tab>
        <Tabs.Tab value="generator" >Generator</Tabs.Tab>
      </Tabs.List>
               <Tabs.Panel value={"autocomplete"}>
                   <Space h={"md"}/>

                   {/*<Space h="md"/>*/}
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
                           onChange={setAutoCompleteText}
                           placeholder="සිංහලෙන් ලියන්න..."
                           data={data}
                           size="md"
                       />
                   </Paper>

               </Tabs.Panel>
               <Tabs.Panel value={"generator"}>
                   <Space h={"md"}/>

                   {/*<Space h="md"/>*/}
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
                           data={data}
                           size="md"
                       />
                       <Space h="md"/>
                       <Button leftIcon={<IconRefresh/>} onClick={() => setGenerating(!generating)} >Generate</Button>
                       <Space h="md"/>

                       <Text fw={500} color="gray.7">Predicted words:</Text>
    {/*                   <Box*/}
    {/*  sx={(theme) => ({*/}
    {/*    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],*/}
    {/*    textAlign: 'center',*/}
    {/*    padding: theme.spacing.xl,*/}
    {/*    borderRadius: theme.radius.md,*/}
    {/*    cursor: 'pointer',*/}

    {/*  })}*/}
    {/*>*/}
                           <Space h="sm"/>
                           {/*<Center>*/}
                           {/*    <Loader/>*/}
                           {/*</Center>*/}
                       {!generating && <>
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
                                   <Chip.Group>
                                   <Group position="left">
                                       <Chip size={"md"} value="1">ලියන්න</Chip>
                                       <Chip size={"md"} value="2">යන්න</Chip>
                                       <Chip size={"md"} value="3">ය</Chip>
                                   </Group>
                                   </Chip.Group>
                               }
    {/*</Box>*/}
                       
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
           {texts.map((t, i) =>
                   (
                       <Group key={"gen" + i}>
                           <List.Item>{t}</List.Item>
                           <CopyButton value="https://mantine.dev" timeout={2000}>
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
      {/*<List.Item>Clone or download repository from GitHub</List.Item>*/}
      {/*<List.Item>Install dependencies with yarn</List.Item>*/}
      {/*<List.Item>To start development server run npm start command</List.Item>*/}
      {/*<List.Item>Run tests to make sure your changes do not break the build</List.Item>*/}
    </List>

                   </Paper>

               </Tabs.Panel>
           </Tabs>

            {/*<SegmentedControl*/}
            {/*    color={"pink"}*/}
            {/*  value={writerMode}*/}
            {/*  onChange={setWriterMode}*/}
            {/*  data={[*/}
            {/*    { label: 'AutoComplete', value: 'autocomplete' },*/}
            {/*    { label: 'Generator', value: 'generator' },*/}
            {/*  ]}*/}
            {/*/>*/}
        </AppShell>
    );
}
