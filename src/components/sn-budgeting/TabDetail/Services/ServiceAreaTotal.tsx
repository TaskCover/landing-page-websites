import { Box, Stack, Typography } from "@mui/material";
import { H6, PTag, ServiceBox } from "./ServiceUtil";

export const ServiceAreaTotal = () => {
  return (
    <Box p="15px">
      <Stack gap={1}>
        <Stack direction="row" gap={1}>
          <ServiceBox remaining="56%">
            <Stack direction="row" justifyContent="space-between">
              <H6>TIME</H6>
              <PTag>15 Jun, 2023</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Estimated time</H6>
              <PTag>00:00</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Worked time</H6>
              <PTag>00:00</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Remaining time (56%)</H6>
              <PTag>00:00</PTag>
            </Stack>
          </ServiceBox>
          <ServiceBox remaining="50%">
            <Stack direction="row" justifyContent="space-between">
              <H6>PROFIT</H6>
              <PTag>15 Jun, 2023</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Revenue</H6>
              <PTag>$0,00</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Cost</H6>
              <PTag>$0,00</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Profit (50%)</H6>
              <PTag>$0,00</PTag>
            </Stack>
          </ServiceBox>
          <ServiceBox>
            <Stack justifyContent="space-between" height="100%">
              <H6>INVOICING</H6>
              <Typography component="p" fontSize="small">
                Invoicing is not available for internal budgets.
              </Typography>
            </Stack>
          </ServiceBox>
        </Stack>
        <Stack direction="row" gap={1}>
          <ServiceBox remaining="80%">
            <Stack direction="row" justifyContent="space-between">
              <H6>TIME</H6>
              <PTag>15 Jun, 2023</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Estimated time</H6>
              <PTag>00:00</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Worked time</H6>
              <PTag>00:00</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Remaining time (80%)</H6>
              <PTag>00:00</PTag>
            </Stack>
          </ServiceBox>
          <ServiceBox remaining="20%">
            <Stack direction="row" justifyContent="space-between">
              <H6>PROFIT</H6>
              <PTag>15 Jun, 2023</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Revenue</H6>
              <PTag>$0,00</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Cost</H6>
              <PTag>$0,00</PTag>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <H6>Profit (20%)</H6>
              <PTag>$0,00</PTag>
            </Stack>
          </ServiceBox>
          <ServiceBox>
            <Stack justifyContent="space-between" height="100%">
              <H6>INVOICING</H6>
              <Typography component="p" fontSize="small">
                Invoicing is not available for internal budgets.
              </Typography>
            </Stack>
          </ServiceBox>
        </Stack>
      </Stack>
    </Box>
  );
};
