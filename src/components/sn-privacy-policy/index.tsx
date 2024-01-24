"use client";

import React, { memo, useState } from "react";
import { Container, InputBase, Stack, styled } from "@mui/material";
import { Button, Text } from "components/shared";
import { ListPolicies } from "./configs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { HEADER_HEIGHT } from "layouts/Header";

type PrivacyPolicyPageProps = {};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: "16px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BDD6FB",
    fontSize: 16,
    fontWeight: 500,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    padding: "16px 24px",
    alignItems: "center",
    "&:focus": {
      borderRadius: 16,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const PrivacyPolicyPage = (props: PrivacyPolicyPageProps) => {
  const [tabActive, setTabActive] = useState(ListPolicies[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setTabActive(event.target.value);
  };
  return (
    <Stack
      width="100%"
      sx={{
        background: "url(/images/about-us/bg-head.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      pt={HEADER_HEIGHT / 8}
    >
      <Container>
        <Stack
          gap="24px"
          sx={[sectionContainerSx, {}]}
          display={{ xs: "flex", md: "grid" }}
          direction="column"
          gridTemplateColumns="1fr 2fr"
        >
          <Stack
            gap="24px"
            p="24px"
            width="100%"
            sx={{
              borderRadius: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.40)",
              boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
            }}
          >
            <Text variant="h3" fontSize="20px" sx={[textGradientSx]}>
              Policies
            </Text>
            <Stack
              direction="row"
              display={{ xs: "none", md: "grid" }}
              gap="12px"
            >
              {ListPolicies.map((item, index) => (
                <Stack
                  p="16px 24px"
                  key={index}
                  onClick={() => setTabActive(item)}
                  sx={{
                    color: tabActive === item ? "#fff " : "#000",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                    borderRadius: "16px",
                    border: "1px solid #BDD6FB",
                    backgroundColor: tabActive === item ? "#5C98F6 " : "#fff",
                    width: "100%",
                    transition: ".3s",
                    "&:hover": {
                      cursor: "pointer",
                      transform: "scale(1.1)",
                      transition: ".3s",
                    },
                  }}
                >
                  {item}
                </Stack>
              ))}
            </Stack>
            <Stack display={{ xs: "flex", md: "none" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={tabActive}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  input={<BootstrapInput />}
                >
                  {ListPolicies.map((e) => (
                    <MenuItem value={e}>{e}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            gap="40px"
            width="100%"
            height="100%"
            justifyContent="start"
            pt="16px"
          >
            <Text variant="h3" fontSize="20px" sx={[]}>
              {tabActive}
            </Text>
            <Stack>
              <Text sx={[textDescSx, { mb: "20px" }]}>
                Effective as of: Mar 9, 2023
                <br />
                Your privacy is extremely important to us. To better protect
                you, we provide this notice explaining our online information
                practices and the choices you can make about the way your
                information is collected and used.
              </Text>
              <Text sx={[textDescSx]} fontWeight={500}>
                If you do not agree to our use of your personal data in line
                with this policy, please do not use the ClickUp Services.
              </Text>
              <Text sx={[textLabelSx]}>Scope of this Privacy Policy</Text>
              <Text sx={[textDescSx]}>
                Please be aware that this Privacy Policy does not govern all the
                information ClickUp may process. Our commitment to customers and
                service providers is governed by a separate Data Protection
                Addendum. This Privacy Policy is also incorporated into and
                governed by our Terms of Use.
                <br />
                Any capitalized words we use in this Privacy Policy that we
                haven’t defined here will have the same meaning that they’re
                given in our Terms of Use. Our commitments to employees are
                governed by our internal employment policies.
                <br />
                In all instances we are committed to transparency with our
                customers, employees, and to protecting your data privacy.
              </Text>
              <Text sx={[textLabelSx]}>What Information do we Collect?</Text>
              <Text sx={[textDescSx]}>
                {`You will be required to establish an account in order to take advantage of certain features of the ClickUp Service. If you wish to establish an account you will be required to provide us with information (including personally identifiable information and non-personally identifiable information). In addition, we may obtain your personally identifiable information from you if you identify yourself to us by sending us an e-mail with questions or comments. ${(
                  <br />
                )}
                        Depending on your use of the ClickUp Service, we collect two types of information:personally identifiable information and non-personally identifiable information. ${(
                          <br />
                        )}
                        Personally Identifiable InformationPersonally identifiable information identifies you or can be used to identify or contact you. Examples of personally identifiable information may include your name, IP address, company name, job title, address, e-mail address, telephone number, and billing and credit card information. ${(
                          <br />
                        )}
                        Non-Personally Identifiable InformationNon-personally identifiable information is information, any single item of which, by itself, cannot be used to identify or contact you, which may include demographic information (such as age, profession, company industry, gender, current location, or zip code), IP addresses, browser types, domain names, and statistical data involving the use of the ClickUp Service. Certain non-personally identifiable information may be considered a part of your personally identifiable information if it were combined with other identifiers (for example, combining your zip code with your street address) in a way that enables you to be identified. But the same pieces of information may be considered non-personally identifiable information when they are taken alone or combined only with other non-personally identifiable information (for example, your account preferences).`}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default memo(PrivacyPolicyPage);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "60px 16px", md: "60px 0px 120px" },
};

const textGradientSx = {
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const textLabelSx = {
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "24px",
  color: "#000",
};

const textDescSx = {
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  color: "#000",
};
