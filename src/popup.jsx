import React, { useState } from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import Background from "./background";
import "./../public/popup.css";
import {
    ChakraProvider,
    Stack,
    Checkbox,
    Button,
    Switch,
} from "@chakra-ui/react";

const indexMapping = {
    0: "instagram",
    1: "twitter",
    2: "reddit",
};

var globalToggle = await chrome.storage.local
    .get("toggle")
    .then((res) => res.toggle);

var globalBlockList = await chrome.storage.local
    .get("blockList")
    .then((res) => res.blockList);

var globalBlockListToggle = [false, false, false];

globalBlockListToggle = globalBlockListToggle.map((item, index) => {
    if (globalBlockList.includes(indexMapping[index])) {
        return !item;
    } else {
        return item;
    }
});

const clickHandler = (event, setBlockList) => {
    event.preventDefault();
    const inputList = Array.from(document.querySelectorAll("main input"));
    const list = inputList
        .map((item, index) => {
            if (item.checked) {
                return indexMapping[index];
            }
        })
        .filter((item) => item !== undefined);

    chrome.storage.local.set({ blockList: list });
};

const setLocalStorage = async (item) => {
    chrome.storage.local.set(item);
};

function Popup() {
    const [blockList, setBlockList] = useState(globalBlockList);

    const [toggle, setToggle] = useState(globalToggle);

    const [blockListToggle, setBlockListToggle] = useState(
        globalBlockListToggle
    );

    return (
        <ChakraProvider>
            <header>
                <p>壁</p>
                <p>Block Options</p>
            </header>
            <main>
                <Stack spacing={4} direction={"column"}>
                    <Checkbox
                        size="lg"
                        colorScheme="pink"
                        isChecked={blockListToggle[0]}
                        onChange={() => {
                            setBlockListToggle((list) => {
                                return list.map((item, index) => {
                                    if (index == 0) {
                                        return !item;
                                    } else {
                                        return item;
                                    }
                                });
                            });
                        }}
                    >
                        Instagram
                    </Checkbox>
                    <Checkbox
                        size="lg"
                        colorScheme="pink"
                        isChecked={blockListToggle[1]}
                        onChange={() => {
                            setBlockListToggle((list) => {
                                return list.map((item, index) => {
                                    if (index == 1) {
                                        return !item;
                                    } else {
                                        return item;
                                    }
                                });
                            });
                        }}
                    >
                        Twitter
                    </Checkbox>
                    <Checkbox
                        size="lg"
                        colorScheme="pink"
                        isChecked={blockListToggle[2]}
                        onChange={() => {
                            setBlockListToggle((list) => {
                                return list.map((item, index) => {
                                    if (index == 2) {
                                        return !item;
                                    } else {
                                        return item;
                                    }
                                });
                            });
                        }}
                    >
                        Reddit
                    </Checkbox>
                    <Button
                        colorScheme="pink"
                        size={"lg"}
                        onClick={(event) => clickHandler(event, setBlockList)}
                    >
                        Done
                    </Button>
                </Stack>
            </main>
            <footer>
                <div className="toggle-box">
                    <Switch
                        colorScheme="pink"
                        isChecked={toggle}
                        onChange={() => {
                            setToggle((toggle) => {
                                setLocalStorage({ toggle: !toggle });
                                return !toggle;
                            });
                        }}
                    />
                    <p>Extension Toggle</p>
                </div>
            </footer>
        </ChakraProvider>
    );
}

const container = document.getElementById("react-target");
const root = createRoot(container);
root.render(<Popup />);
