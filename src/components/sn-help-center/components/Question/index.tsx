import { Stack } from "@mui/material";
import { CollapseQuestion, Text } from "components/shared";
export const HelperQuestion = () => {
  return (
    <Stack mt={11} position="relative" sx={{
      width: "100%",
      m: "0 auto",
      maxWidth: "1200px",
    }}>
      <Text textAlign="center" fontSize={{ md: 40, xs: 24 }} fontWeight={500}>
        Frequently asked questions.
      </Text>
      <Stack
        sx={{
          backgroundImage: "url(/images/bg-helper-center.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          aspectRatio: "2210/1503",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Stack maxWidth={800} mx="auto">
        {DATA.map((data, index) => (
          <CollapseQuestion
            key={index}
            label={
              <Stack direction="row" justifyContent="space-between">
                <Text color="text.primary" variant="h6">
                  {data.question}
                </Text>
              </Stack>
            }
          >
            <Stack
              mt={1}
              color="#fff"
              sx={{
                backgroundColor: "#5C98F6",
                py: 3.5,
                px: 2,
                borderRadius: 4,
              }}
            >
              <Text mb={2} color="#fff">
                {data.answer.title}
              </Text>
              {data.answer.content}
            </Stack>
          </CollapseQuestion>
        ))}
      </Stack>
    </Stack>
  );
};

const DATA = [
  {
    question: "I need to contact TaskCover, how can I do that?",
    answer: {
      title: "What are the available payment methods?",
      content: `Pay only the flat monthly rate as described in your plan, regardless of usage and team size. Sharing projects and folders with editors and collaborators are always free.
            Upgrade to any premium plan for a set number of team members at a flat monthly rate. We will only count unique workspace members towards your team limit. If you have any additional questions, please don't hesitate to contact us.`,
    },
  },
  {
    question: "Are there any current promotions or discounts for TaskCover?",
    answer: {
      title: "What are the available payment methods?",
      content: `Pay only the flat monthly rate as described in your plan, regardless of usage and team size. Sharing projects and folders with editors and collaborators are always free.
            Upgrade to any premium plan for a set number of team members at a flat monthly rate. We will only count unique workspace members towards your team limit. If you have any additional questions, please don't hesitate to contact us.`,
    },
  },
  {
    question: "Why should I consider purchasing the Plus package?",
    answer: {
      title: "What are the available payment methods?",
      content: `Pay only the flat monthly rate as described in your plan, regardless of usage and team size. Sharing projects and folders with editors and collaborators are always free.
            Upgrade to any premium plan for a set number of team members at a flat monthly rate. We will only count unique workspace members towards your team limit. If you have any additional questions, please don't hesitate to contact us.`,
    },
  },
  {
    question: "Are there any current promotions or discounts for TaskCover?",
    answer: {
      title: "What are the available payment methods?",
      content: `Pay only the flat monthly rate as described in your plan, regardless of usage and team size. Sharing projects and folders with editors and collaborators are always free.
            Upgrade to any premium plan for a set number of team members at a flat monthly rate. We will only count unique workspace members towards your team limit. If you have any additional questions, please don't hesitate to contact us.`,
    },
  },
];
