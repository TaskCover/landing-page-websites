import { Stack } from "@mui/material";
import { Text } from "components/shared";
import Image from "next/image";

export const PartnerUseCase = () => {
  return (
    <Stack mt={{md: 20, xs: 10}} sx={{ backgroundColor: "#fff" }} py={4}>
      <Text fontSize={{ md: 20, xs: 16 }} fontWeight={500} textAlign="center">
        See how TaskCover empower Marketing Agencies globally
      </Text>
      <Stack
        direction="row"
        alignItems="center"
        spacing={4.375}
        mt={5}
        gap={{ md: 0, xs: 1 }}
        justifyContent="center"
        flexWrap="wrap"
      >
        {PARTNER.map((partner, index) => (
          <Stack key={index} width={{ md: "unset", xs: "20%" }}>
            <Image
              src={partner}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="partner"
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const PARTNER = [
  "/images/ai-partner-1.png",
  "/images/ai-partner-2.png",
  "/images/ai-partner-3.png",
  "/images/ai-partner-4.png",
  "/images/ai-partner-5.png",
];
