import { FormControl, Stack, Input } from "@mui/material";
import { Button, Text, TextGradient } from "components/shared";
import ArrowDownIcon from "icons/ArrowDownIcon";

export const HelperForm = () => {
  return (
    <Stack mt={15.5} alignItems="center">
      <TextGradient
        fontSize={{ md: 40, xs: 24 }}
        textAlign="center"
        fontWeight={500}
      >
        Please let us know
        <Text
          component="span"
          fontSize="inherit"
          sx={{
            WebkitTextFillColor: "black",
          }}
        >
          &#160;if you need help finding something.
        </Text>
      </TextGradient>
      <FormControl sx={{ mt: 5 }}>
        <Stack
          maxWidth={552}
          height={54}
          sx={{
            border: "1px solid #0575E6",
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 13.5,
            px: 0.452,
            py: 0.452,
          }}
        >
          <Input
            disableUnderline
            sx={{ px: 2, color: "#4B5563" }}
            placeholder="Type your question"
          />
          <Button className="MuiButton-primary" sx={{ px: 6 }}>
            Search
          </Button>
        </Stack>
      </FormControl>
      <Stack mt={8} direction={{md: "row", xs: "column"}} justifyContent="space-between" spacing={3}>
        {DATA.map((data, index) => (
          <Stack
            key={index}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 4,
              paddingLeft: 3,
              paddingRight: 6,
              paddingTop: 3,
              paddingBottom: 6,
              flex: 1
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Text>{data.title}</Text>
              <ArrowDownIcon />
            </Stack>
            <Text>
              {data.content}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const DATA = [
  {
    title: "🎯 Project",
    content:
      "Discover specific tactics and expertise to empower your financial decisions with confidence and accuracy. ",
  },
  {
    title: "💰 Budget",
    content:
      "Ensure the efficient and effective attainment of project objectives",
  },
  {
    title: "🤖 AI",
    content: "The revolutionary power of artificial intelligence",
  },
];
