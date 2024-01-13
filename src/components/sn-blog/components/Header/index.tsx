import { FormControl, Input, Stack } from "@mui/material";
import { ButtonCustom, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import FacebookIcon from "icons/FacebookIcon";
import InstagramIcon from "icons/InstagramIcon";
import LinkInIcon from "icons/LinkInIcon";
import PremiumIcon from "icons/PremiumIcon";
import SendMesIcon from "icons/SendMesIcon";
import TwitterIcon from "icons/TwitterIcon";
import Image from "next/image";

export const HeaderBlog = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack mt={{md: 12, xs: 2}}>
      <Stack direction={{md: "row", xs: "column"}} gap={3.75} alignItems="center">
        <Stack flex={{md: 0.8, xs: 1}}>
          <Text fontSize={{ md: 60, xs: 24 }} fontWeight={700}>
            Tackle all your problems collaboratively and pave the way for
            success.
          </Text>
          <Text color="#7C828D" fontWeight={400} mt={1}>
            Unlock the value of management and optimization for your agency
            right now.
          </Text>
          <FormControl sx={{ mt: 3 }}>
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
              <ButtonCustom className="MuiButton-primary" sx={{ px: {md: 6, xs: 1.8} }}>
                {isMdSmaller ? (
                  <Image
                    src="/images/send-2.png"
                    width={20}
                    height={20}
                    alt="send-btn"
                  />
                ) : (
                  "Subscribe"
                )}
              </ButtonCustom>
            </Stack>
          </FormControl>
          <Stack direction="row" spacing={3} mt={3}>
            <Text>Follow us on:</Text>
            <FacebookIcon />
            <InstagramIcon />
            <LinkInIcon />
            <PremiumIcon />
            <TwitterIcon />
          </Stack>
        </Stack>
        <Stack flex={1} width="100%">
          <Image
            src="/images/blog-header-artilce.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="blog-header-artilce"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
