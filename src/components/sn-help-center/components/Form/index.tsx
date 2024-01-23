import { FormControl, Stack, Input } from "@mui/material";
import { ButtonCustom, Text, TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import ArrowDownIcon from "icons/ArrowDownIcon";
import SearchIcon from "icons/SearchIcon";
import { useState } from "react";

export const HelperForm = () => {
  const { isMdSmaller } = useBreakpoint();
  const [value, setValue] = useState("");
  const handlerChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handlerSubmitForm = () => {
    console.log("feedback", value);
  };

  return (
    <Stack
      alignItems="center"
      pb={{ md: 15, xs: 8 }}
      mt={{ md: 0, xs: 12 }}
      position="relative"
    >
      {isMdSmaller && (
        <Stack
          sx={{
            backgroundImage: "bg-target-help-center.png",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%%",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: { md: "-50px", xs: 0 },
            zIndex: -1,
          }}
        />
      )}
      <TextGradient
        fontSize={{ md: 40, xs: 24 }}
        textAlign="center"
        fontWeight={500}
      >
        Please let us know
        <Text
          component="span"
          fontSize="inherit"
          fontWeight={500}
          sx={{
            WebkitTextFillColor: "black",
          }}
        >
          &#160;if you need help finding something.
        </Text>
      </TextGradient>
      <FormControl sx={{ mt: 5 }} onSubmit={handlerSubmitForm}>
        <Stack
          width={{ md: 552, xs: 342 }}
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
            onChange={handlerChangeValue}
            value={value}
          />
          <ButtonCustom
            onClick={handlerSubmitForm}
            className="MuiButton-primary"
            sx={{ px: { md: 6, xs: 2 } }}
          >
            {isMdSmaller ? <SearchIcon /> : "Search"}
          </ButtonCustom>
        </Stack>
      </FormControl>
      <Stack
        mt={8}
        direction={{ md: "row", xs: "column" }}
        justifyContent="space-between"
        spacing={3}
      >
        {DATA.map((data, index) => (
          <Stack
            key={index}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 4,
              paddingLeft: 3,
              paddingRight: 3,
              paddingTop: 3,
              paddingBottom: 6,
              flex: 1,
            }}
          >
            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Text fontSize={24} fontWeight={700}>
                {data.title}
              </Text>
              <ArrowDownIcon sx={{ fontSize: 31 }} />
            </Stack>
            <Text>{data.content}</Text>
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
