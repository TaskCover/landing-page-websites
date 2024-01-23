/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-children-prop */
"use client";
import { Box } from "@mui/material";
import { Text } from "components/shared";
import DocsItem from "icons/DocsItem";
import IconAdd from "icons/IconAdd";
import React, { memo } from "react";
import MorePoper from "./MorePoper";
import { IDocument } from "constant/types";

export interface ItemDocsProps {
    onClick?: any;
    title: string| undefined;
    project_id?: string;
    id?: string;
    children: ItemDocsProps[] | undefined;
}
type TDocumentListProps = {
    isFirst?: boolean;
    data: IDocument;
    onClick: any;
};


const Document = ({ title, id, project_id, onClick }: ItemDocsProps) => {
    return (
        <>
            <Box
                sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 1,
                    ":hover": {
                        " .btn-more": {
                            visibility: "visible",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <DocsItem></DocsItem>
                    <Text sx={{ flex: 1 }} fontWeight={500} fontSize={14}>
                        {title}
                    </Text>
                </Box>
                <Box
                    className="btn-more"
                    sx={{
                        visibility: "hidden",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.4,
                    }}
                >
                    <MorePoper></MorePoper>
                    <Box
                        onClick={() => onClick(id, project_id)}
                        sx={{
                            cursor: "pointer",
                        }}
                    >
                        <IconAdd></IconAdd>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

const DocumentList: React.FC<TDocumentListProps> = ({ data, onClick }) => {
    return (
        <>
            <Document onClick={onClick} children={data?.child} id={data?.id} project_id={data?.project_id} title={data?.name} />
            {data?.child && (
                <Box
                    sx={{
                        marginLeft: {
                            md: "24px",
                            xs: "16px",
                        },
                    }}
                >
                    {Array.isArray(data?.child) &&
                        data?.child?.map((item: IDocument) => {
                            return (
                                <DocumentList onClick={onClick} key={item._id} data={item} />
                            );
                        })}
                </Box>
            )}
        </>
    );
};

export default memo(DocumentList);
