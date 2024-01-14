import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Image from "next/image";

type BreadcrumbsProps = {
  breadcrumbsList: React.JSX.Element[];
};

export default function Breadcrumb(props: BreadcrumbsProps) {
  const { breadcrumbsList } = props;

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          color: "#000",
          "a, p, div, span": { color: "#000", fontWeight: 600, fontSize: {md: 16, xs: 12}, lineHeight: 2.5 },
          ".MuiBreadcrumbs-separator": {
            fontSize: {md: 25, xs: 20},
            mx: {md: 2, xs: 1},
          },
        }}
      >
        {breadcrumbsList}
      </Breadcrumbs>
    </Stack>
  );
}
