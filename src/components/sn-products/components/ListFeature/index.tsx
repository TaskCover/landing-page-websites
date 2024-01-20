import { Stack, List, ListItem } from "@mui/material";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";
import React, { useState } from "react";
import { Text, TextGradient } from "components/shared";

type Feature = {
  id: number | string;
  text?: string;
  imageUrl: string;
};

export type ListFeaturesProps = {
  heading?: string | React.ReactNode;
  initData?: Feature;
  features: Feature[];
  isReversed?: boolean;
  order?: number;
};

export const ListFeatures = (props: ListFeaturesProps) => {
  const {
    heading,
    features,
    initData = features[0],
    isReversed,
    order,
  } = props;
  const [currentData, setCurrentData] = useState<Feature>(initData);
  const { isMdSmaller } = useBreakpoint();
  const handlerChangeImage = (data: Feature) => {
    setCurrentData(data);
  };
  return (
    <Stack
      direction={isReversed ? "row-reverse" : "row"}
      width="100%"
      spacing={{ md: 7.75, xs: 0 }}
      mt={{ md: heading ? (order === 0 ? 7 : 20) : 0, xs: 2 }}
    >
      {initData.text && (
        <List sx={{ flex: { md: 0.5, xs: 1 } }}>
          {heading && <ListItem>{heading}</ListItem>}
          {features.map((feature, index) => {
            const isActive = currentData.id === feature.id;
            const showImage = isActive && isMdSmaller;
            return (
              <>
                <ListItem
                  key={index}
                  onClick={() => handlerChangeImage(feature)}
                  sx={{
                    p: 1.5,
                    background: isActive ? "#5C98F6" : "#EFF5FE",
                    borderRadius: 1.3,
                    color: isActive ? "#FFF" : "#000",
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all .4s",
                    boxShadow: isActive
                      ? "0px 0px 0px 3px rgba(28, 134, 213, 0.47)"
                      : "none",

                    mb: 1,
                    "&:hover": {
                      boxShadow: "0px 0px 0px 3px rgba(28, 134, 213, 0.47)",
                    },
                  }}
                >
                  {feature.text}
                </ListItem>

                {showImage && (
                  <ListItem>
                    <Image
                      src={currentData.imageUrl}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      alt="create-budget"
                    />
                  </ListItem>
                )}
              </>
            );
          })}
        </List>
      )}

      <Stack
        flex={1}
        display={{ md: "flex", xs: initData.text ? "none" : "flex" }}
      >
        <Image
          src={currentData.imageUrl}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="create-budget"
        />
      </Stack>
    </Stack>
  );
};
