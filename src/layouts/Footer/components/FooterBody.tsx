import { Grid } from "@mui/material";
import { memo } from "react";
import { Text } from "components/shared";

type FooterBody = {
  label: string;
  isHeading?: boolean;
  link?: string;
};

const FooterBody = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={6}>
        <Text fontWeight={700} variant="body1" mb={3} textTransform="uppercase">
          {DATA.solutions.heading}
        </Text>
        {DATA.solutions.content.map((content, index) => (
          <Text key={index} mb={3} fontWeight={400}>
            {content.label}
          </Text>
        ))}
      </Grid>
      <Grid item md={3} xs={6}>
        <Text fontWeight={700} variant="body1" mb={3} textTransform="uppercase">
          {DATA.documentation.heading}
        </Text>
        {DATA.documentation.content.map((content, index) => (
          <Text key={index} mb={3} fontWeight={400}>
            {content.label}
          </Text>
        ))}
      </Grid>
      <Grid item md={3} xs={6}>
        <Text fontWeight={700} variant="body1" mb={3} textTransform="uppercase">
          {DATA.resources.heading}
        </Text>
        {DATA.resources.content.map((content, index) => (
          <Text key={index} mb={3} fontWeight={400}>
            {content.label}
          </Text>
        ))}
      </Grid>
      <Grid item md={3} xs={6}>
        <Text fontWeight={700} variant="body1" mb={3} textTransform="uppercase">
          {DATA.company.heading}
        </Text>
        {DATA.company.content.map((content, index) => (
          <Text key={index} mb={3} fontWeight={400}>
            {content.label}
          </Text>
        ))}
      </Grid>
    </Grid>
  );
};

export default memo(FooterBody);

const DATA = {
  solutions: {
    heading: "Solutions",
    content: [
      {
        label: "Self-hosted",
      },
      {
        label: "SaaS Hosting",
      },
      {
        label: "Platform",
      },
      {
        label: "Desktop App",
      },
    ],
  },
  documentation: {
    heading: "Documentation",
    content: [
      {
        label: "Product",
      },
      {
        label: "Developers",
      },
      {
        label: "Public API",
      },
      {
        label: "Docker",
      },
    ],
  },
  resources: {
    heading: "resources",
    content: [
      {
        label: "Blog",
      },
      {
        label: "Merch Store",
      },
      {
        label: "Open Startup",
      },
      {
        label: "Embed",
      },
      {
        label: "Developers",
      },
      {
        label: "Routing Forms",
      },
      {
        label: "Workflows",
      },
      {
        label: "App Store",
      },
    ],
  },
  company: {
    heading: "Company",
    content: [
      {
        label: "About",
      },
      {
        label: "Privacy",
      },
      {
        label: "Terms",
      },
      {
        label: "License",
      },
      {
        label: "Security",
      },
    ],
  },
};
