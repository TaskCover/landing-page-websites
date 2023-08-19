"use client";
import React, { useRef, useEffect, useState } from "react";
import { Box, BoxProps } from "@mui/material";
import Content from "./Content";

const Description = (props: BoxProps) => {
    const { children = "--" } = props;
    const ref = useRef<HTMLElement | null>(null);
    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    useEffect(() => {
        setIsOverflow((ref.current?.scrollHeight ?? 0) > 38);
    }, []);

    if (!children) return <Content />;

    return (
        <Box
            component="p"
            ref={ref}
            sx={{
                fontSize: 14,
                px: 2,
                m: 0,
                py: "3px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                whiteSpace: "nowrap",
                height: 30,
                "& > p": {
                    m: 0,
                },
                "& *": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                },
            }}
            className="html"
            dangerouslySetInnerHTML={{
                __html: children,
            }}
        />
    );
};

export default Description;
