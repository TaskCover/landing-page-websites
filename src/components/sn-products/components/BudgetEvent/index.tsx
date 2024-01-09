import { Stack } from "@mui/material";
import { Text, Button } from "components/shared";

export const BudgetEvent = () => {
  return (
    <Stack
      mt={11}
      sx={{
        width: "100%",
        minHeight: 290,
      }}
    >
      <Stack
        sx={{
          backgroundImage: "url(/images/budget-event-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          minHeight: 290,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: -40,
        }}
      >
        <Text mb={5} color="#fff" variant={{ md: "h3", xs: "h5" }}>
          READY TO BUDGETING YOUR AGENCY?
        </Text>
        <Button
          sx={{
            background: "#fff",
            color: "#000",
            "&:hover": { background: "#fff" },
          }}
        >
          STAR TO FREE TRIAL
        </Button>
      </Stack>
    </Stack>
  );
};
