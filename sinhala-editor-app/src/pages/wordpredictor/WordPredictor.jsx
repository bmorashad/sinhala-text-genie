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
import Generator from "./tools/generator/Generator.jsx";
import AutoCompleteWriter from "./tools/autocomplete/AutoCompleteWriter.jsx";

export default function WordPredictor() {
    return (
        <Tabs defaultValue="generator" color={"pink"}>
            <Tabs.List>
                <Tabs.Tab value="autocomplete" >AutoComplete</Tabs.Tab>
                <Tabs.Tab value="generator" >Generator</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={"autocomplete"}>
                <Space h={"md"}/>
                <AutoCompleteWriter/>
            </Tabs.Panel>
            <Tabs.Panel value={"generator"}>
                <Space h={"md"}/>
                <Generator/>
            </Tabs.Panel>
        </Tabs>
    )

}

