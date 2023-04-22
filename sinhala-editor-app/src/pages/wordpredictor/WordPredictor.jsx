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
import NextWordPredictor from "./tools/predictor/NextWordPredictor.jsx";
import AutoCompleteWriter from "./tools/autocomplete/AutoCompleteWriter.jsx";

export default function WordPredictor() {
    return (
                <NextWordPredictor/>
    )

}

