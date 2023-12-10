import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Text } from "components/shared";
import Link from "components/Link";
import { BoxData, accordionSx } from "./Util";

export const HomeTab = () => {
  return (
    <Box mt={2} sx={accordionSx}>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Text fontWeight="bold" sx={{ fontSize: "18px", color: "black" }}>
            General
          </Text>
        </AccordionSummary>
        <AccordionDetails>
          <BoxData title="Budget name">Administration</BoxData>
          <BoxData title="Owner">Garry Hunt [SAMPLE]</BoxData>
          <BoxData title="Company">PQ</BoxData>
          <BoxData title="Subsidiary">PQ</BoxData>
          <Link href="#" underline="none">
            <Text sx={{ color: "secondary.main" }}>Edit</Text>
          </Link>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Text fontWeight="bold" sx={{ fontSize: "18px", color: "black" }}>
            Detail
          </Text>
        </AccordionSummary>
        <AccordionDetails>
          <BoxData mb={0.5} title="Budget number">
            #9
          </BoxData>
          <BoxData mb={0.5} title="Date">
            5 Dec, 2022
          </BoxData>
          <BoxData mb={0.5} title="Currency">
            USD
          </BoxData>
          <Link href="#" underline="none">
            <Text sx={{ color: "secondary.main" }}>Edit</Text>
          </Link>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Text fontWeight="bold" sx={{ fontSize: "18px", color: "black" }}>
            Project
          </Text>
        </AccordionSummary>
        <AccordionDetails>
          <BoxData mb={0.5} title="Project">
            Internal project [SAMPLE]
          </BoxData>
          <Link href="#" underline="none">
            <Text sx={{ color: "secondary.main" }}>
              Move to another project
            </Text>
          </Link>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
