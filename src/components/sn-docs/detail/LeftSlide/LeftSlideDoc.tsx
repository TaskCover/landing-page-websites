"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { Search } from "components/Filters";
import { NS_DOCS } from "constant/index";
import { useTranslations } from "next-intl";
import React, { memo, useState, useEffect } from "react";
import DocumentList from "./ItemDocs";
import { Text } from "components/shared";
import { useAppSelector } from "store/hooks";
import ArrowRight from "icons/ArrowRight";
import { uuid } from "utils/index";
import useTheme from "hooks/useTheme";
import { useGetDocDetailQuery, useCreateDocMutation } from "store/docs/api";
import { useParams } from "next/navigation";

export interface LeftSlideDocProps {
    open: boolean;
    setOpen?: any;
}

const LeftSlideDoc = ({ open, setOpen }: LeftSlideDocProps) => {
    const dataFake = useAppSelector((state) => state.doc.docDetails.data);
    const { id } = useParams();
    const { data: document, isLoading } = useGetDocDetailQuery(id as string);
    const [createDoc, { data: docsData, error }] = useCreateDocMutation();

    const [data, setData] = useState({});
    const docsT = useTranslations(NS_DOCS);
    const [search, setSearch] = useState("");
    const onChangeQueries = (name: string, value: any) => {
        setSearch(value);
    };

    useEffect( () => {
        setData(document)
    }, [document])


    const addChildToData = (parent, child) => {
        console.log('parent', parent)
        const newData = { ...data };

        const addChildToParent = async (parentNode) => {

            const modifiedParentNode = {
                ...parentNode,
                child: parentNode.child || []
            };

            if (modifiedParentNode.id === parent) {
                modifiedParentNode.child = Array.isArray(modifiedParentNode.child) ? [...modifiedParentNode.child, child] : [child];
                const result = await createDoc(child);
            } else {
                modifiedParentNode.child.forEach((child) => {
                    addChildToParent(child);
                });
            }
        };
        addChildToParent(newData);
        setData(newData);
    };

    // Hàm xử lý khi nhấn nút "Thêm mục con"
    const handleAddChild = (parent, project_id) => {
        const id = uuid();
        const newChild = {
            id: id,
            project_id: project_id,
            root_directory : parent,
            name: "No name",
            description: "",
        };

        addChildToData(parent, newChild);
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: {
                    sm: "30%",
                    xs: open ? "236px" : "0",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    height: "100%",
                    backgroundColor: {
                        sm: "unset",
                        xs: "background.paper",
                    },
                    width: "100%",
                    zIndex: "39",
                    display: "block",
                }}
            >
                <Box
                    onClick={() => setOpen((value) => !value)}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: open ? "calc(100% + 4px)" : "calc(100% - 16px)",
                        padding: "4px",
                        display: {
                            sm: "none",
                            xs: "flex",
                        },
                        zIndex: "30",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#E1F0FF",
                        transform: open ? "rotate(180deg)" : "unset",
                    }}
                >
                    <ArrowRight />
                </Box>
                <Box
                    sx={{
                        display: {
                            sm: "block",
                            xs: open ? "block" : "none",
                        },
                        width: {
                            sm: "auto",
                            xs: open ? "200px" : "0",
                        },
                    }}
                >
                    <Search
                        placeholder={docsT("filter.search", { name: "email" })}
                        name="doc"
                        onChange={onChangeQueries}
                        value={search}
                        sx={{
                            width: "100%",
                            ".MuiOutlinedInput-root": {
                                backgroundColor: "background.paper",
                            },
                        }}
                    />
                    <Box>
                        <Text
                            sx={{
                                marginTop: "8px",
                            }}
                            color={"grey"}
                            variant={"h6"}
                        >
                            Page
                        </Text>
                        <DocumentList onClick={handleAddChild} data={data} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(LeftSlideDoc);
