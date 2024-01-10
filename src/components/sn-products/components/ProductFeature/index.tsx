import { Stack } from "@mui/material";
import { TextGradient, Text } from "components/shared";
import Image from "next/image";

export const ProductFeature = () => {
  return (
    <Stack mt={25} position="relative">
      <Stack
        sx={{
          backgroundImage: "url(/images/trust-center-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          aspectRatio: "2210/1503",
          position: "absolute",
          top: 0,
          right: { md: "-50px", xs: 0 },
          zIndex: -1,
        }}
      />
      <Stack direction={{md: "row", xs: "column"}} justifyContent="space-between">
        <Stack flex={0.5}>
          <Text fontSize={{ md: 40, xs: 24 }} mb={5}>
            🧑‍💻{" "}
            <TextGradient component="span" fontSize="inherit">
              List of employee
            </TextGradient>
          </Text>
          <Text variant="body2" mb={2}>
            Displays information of employees in the company
          </Text>
          <Text variant="body2" mb={2}>
            Stages of deal
          </Text>
          <Stack direction="row" spacing={1} mb={2}>
            <Image
              src="/images/arrow-gradient-ic.png"
              width={12}
              height={20}
              alt="arrow-ic"
            />
            <TextGradient>Add a new employee account</TextGradient>
          </Stack>
          <Text variant="body2" mb={2}>
            Delete employee accounts
          </Text>
          <Text variant="body2" mb={2}>
            Payment to employee accounts
          </Text>
          <Text variant="body2" mb={2}>
            Edit employee positions
          </Text>
        </Stack>
        <Stack flex={1}>
          <Image
            src="/images/product-employee.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="product-employee"
          />
        </Stack>
      </Stack>

      <Stack mt={10}>
        <Text fontSize={{ md: 40, xs: 24 }}>
          ⌛{" "}
          <TextGradient component="span" fontSize="inherit">
            Cost history
          </TextGradient>
        </Text>
        <Text fontSize={{ md: 40, xs: 20 }} mb={2} pl={4}>
          Track payment history of company accounts
        </Text>
        <Stack>
          <Image
            src="/images/product-history.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="product-history"
          />
        </Stack>
      </Stack>

      <Stack direction={{md: "row", xs: "column"}} justifyContent="space-between" mt={10}>
        <Stack flex={0.5}>
          <Text fontSize={{ md: 40, xs: 24 }} mb={5}>
            💼{" "}
            <TextGradient component="span" fontSize="inherit">
              List of position
            </TextGradient>
          </Text>
          <Text variant="body2" mb={2}>
            Track current information of positions within the company
          </Text>
          <Stack direction="row" spacing={1} mb={2}>
            <Image
              src="/images/arrow-gradient-ic.png"
              width={12}
              height={20}
              alt="arrow-ic"
            />
            <TextGradient>Add a new position</TextGradient>
          </Stack>
          <Text variant="body2" mb={2}>
            Edit position
          </Text>
          <Text variant="body2" mb={2}>
            Delete position
          </Text>
        </Stack>
        <Stack flex={1} position="relative">
          <Image
            src="/images/product-position-1.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="product-position"
          />
          <Stack sx={{ position: "absolute", top: 120, left: -130 }}>
            <Image
              src="/images/product-position-2.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "150%",
                height: "auto",
              }}
              alt="product-infomation"
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={{md: "row-reverse", xs: "column"}}
        justifyContent="space-between"
        mt={10}
        spacing={4}
      >
        <Stack flex={0.5}>
          <Text fontSize={{ md: 40, xs: 24 }} mb={5}>
            💼{" "}
            <TextGradient component="span" fontSize="inherit">
              Project type list
            </TextGradient>
          </Text>
          <Text variant="body2" mb={2}>
            Track current information of project types in the company
          </Text>
          <Stack direction="row" spacing={1} mb={2}>
            <Image
              src="/images/arrow-gradient-ic.png"
              width={12}
              height={20}
              alt="arrow-ic"
            />
            <TextGradient>Add a new project type</TextGradient>
          </Stack>
          <Text variant="body2" mb={2}>
            Edit project type
          </Text>
          <Text variant="body2" mb={2}>
            Delete project type
          </Text>
        </Stack>
        <Stack flex={1} position="relative">
          <Image
            src="/images/project-type-list-1.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="product-position"
          />
          <Stack sx={{ position: "absolute", bottom: 120, right: -130 }}>
            <Image
              src="/images/project-type-list-2.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "150%",
                height: "auto",
              }}
              alt="product-infomation"
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack mt={10}>
        <Text fontSize={{ md: 40, xs: 24 }}>
          🏢{" "}
          <TextGradient component="span" fontSize="inherit">
            Company information
          </TextGradient>
        </Text>
        <Text fontSize={{ md: 40, xs: 20 }} mb={2} pl={4}>
          Display company information
        </Text>
        <Stack>
          <Image
            src="/images/project-company.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="product-history"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
