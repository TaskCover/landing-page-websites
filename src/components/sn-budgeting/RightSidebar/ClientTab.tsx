import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Switch, Text } from "components/shared";
import Link from "components/Link";
import { BoxData, accordionSx } from "./Util";

export const ClientTab = () => {
  return (
    <Box mt={2} sx={accordionSx}>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Text fontWeight="bold" sx={{ fontSize: "18px", color: "black" }}>
            Client detail
          </Text>
        </AccordionSummary>
        <AccordionDetails>
          <BoxData title="Organization">Company</BoxData>
          <Link href="#" underline="none">
            <Text sx={{ color: "secondary.main" }}>Edit company</Text>
          </Link>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Text fontWeight="bold" sx={{ fontSize: "18px", color: "black" }}>
            Contact
          </Text>
        </AccordionSummary>
        <AccordionDetails>
          <BoxData title="Name">Garry Hunt [SAMPLE]</BoxData>
          <BoxData title="Email">garry.hunt@productive.io</BoxData>
          <BoxData title="Phone">35234543</BoxData>
          <Link href="#" underline="none">
            <Text sx={{ color: "secondary.main" }}>Edit contact</Text>
          </Link>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Text fontWeight="bold" sx={{ fontSize: "18px", color: "black" }}>
            Client access
          </Text>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" justifyContent="space-between">
            <Text
              fontWeight="bold"
              sx={{ color: "grey.400", fontSize: "15px" }}
            >
              Client can view this budget
            </Text>
            <Switch
              name="active_view"
              onChange={console.log}
              size="small"
              reverse
              label=""
              value={true}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
