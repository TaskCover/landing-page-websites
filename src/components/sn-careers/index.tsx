"use client";

import { Stack } from '@mui/material';
import { Button, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import { memo } from 'react';
import ListCareersLayout from "./components/list-careers";
import OurPiorityLayout from "./components/our-piority";
import {HEADER_HEIGHT} from 'layouts/Header';

type CareersPageProps = {}

const CareersPage = (props: CareersPageProps) => {
  const { isMdSmaller } = useBreakpoint();


  return (
    <Stack
      width="100%"
      pt={HEADER_HEIGHT / 8 + 1}
    >
      <Stack>
        <Stack
          width="100%"
          sx={{
            background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
          }}
        >
          <Stack
            sx={[sectionContainerSx, {
              gap: "24px",
              justifyContent: "center",
              alignItems: "center",

            }]}
          >
            <Text
              variant="h5"
              sx={{
                letterSpacing: "3.2px",
                color: "#fff"
              }}
            >
              Career
            </Text>
            <Text
              sx={{
                fontSize: { xs: "24px", md: "36px" },
                fontWeight: { xs: 500, md: 700 },
                lineHeight: { xs: "32px", md: "44px" },
                textAlign: "center",
                color: "#fff"
              }}
            >
              JOIN US TO STRIVE FOR {isMdSmaller && <br />} EXCELLENCE
            </Text>
            <Button sx={{
              p: "12px 24px",
              background: "#fff",
              width: { xs: "105px", md: "130px" }
            }}>
              <Text
                variant="h5"
                sx={textGradientSx}
              >
                Contact Us
              </Text>
            </Button>
          </Stack>
        </Stack>

        <ListCareersLayout />
        <OurPiorityLayout />
        <Stack
          sx={[sectionContainerSx, {
            gap: { xs: "24px", md: "56px" },
            justifyContent: "center",
            alignItems: "center"
          }]}
        >
          <Text variant="h3"
            sx={{
              fontSize: { xs: "24px", md: "36px" },
              fontWeight: { xs: 500, md: 700 },
              lineHeight: { xs: "32px", md: "44px" },
              textAlign: "center",
            }}>
            Can't find what you're looking for?
          </Text>
          <Button sx={{
            p: "12px 24px",
            background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
            width: { xs: "105px", md: "130px" }
          }}>
            <Text
              variant="h5"
              color="#fff"
            >
              Contact Us
            </Text>
          </Button>
        </Stack>
      </Stack>
    </Stack >
  )
}

export default memo(CareersPage);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "60px 16px", md: "80px 0px " }
};

const textGradientSx = {
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
