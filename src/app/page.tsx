"use client";

import { Stack, TableRow } from "@mui/material";
import { BodyCell, TableLayout } from "components/Table";
import {
  Button,
  DatePicker,
  IconButton,
  Input,
  InputNumber,
  Select,
  Switch,
  Text,
} from "components/shared";
import CalendarIcon from "icons/CalendarIcon";

export default function Page() {
  return (
    <Stack spacing={2} p={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button variant="primary">Button Default</Button>
        <Button variant="primary" disabled>
          Button Disabled
        </Button>
        <Button variant="primary" size="small">
          Button Small
        </Button>
        <Button variant="primary" fullWidth>
          Button Full Width
        </Button>
        <Button
          variant="primary"
          size="small"
          startIcon={<CalendarIcon />}
          endIcon={<CalendarIcon />}
        >
          Button
        </Button>
        <Button
          variant="primary"
          size="small"
          tooltip="The button has tooltip!"
        >
          Button Tooltip
        </Button>
        <Button
          variant="primaryOutlined"
          size="small"
          tooltip="The button has tooltip!"
        >
          Button Tooltip
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button variant="secondary">Button Default</Button>
        <Button variant="secondary" disabled>
          Button Disabled
        </Button>
        <Button variant="secondary" size="small">
          Button Small
        </Button>
        <Button variant="secondary" fullWidth>
          Button Full Width
        </Button>
        <Button
          variant="secondary"
          size="small"
          startIcon={<CalendarIcon />}
          endIcon={<CalendarIcon />}
        >
          Button
        </Button>
        <Button
          variant="secondary"
          size="small"
          tooltip="The button has tooltip!"
        >
          Button Tooltip
        </Button>
        <Button variant="text" size="small" tooltip="The button has tooltip!">
          Button Tooltip
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton variant="contained">
          <CalendarIcon />
        </IconButton>
        <IconButton variant="contained" disabled>
          <CalendarIcon />
        </IconButton>
        <IconButton>
          <CalendarIcon />
        </IconButton>
        <IconButton noPadding size="large">
          <CalendarIcon />
        </IconButton>
        <IconButton disabled>
          <CalendarIcon />
        </IconButton>
        <IconButton size="large">
          <CalendarIcon />
        </IconButton>
        <IconButton size="normal">
          <CalendarIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Text>Hayes Valley Studio</Text>
        <Text variant={{ md: "body2", lg: "h2" }}>Hayes Valley Studio</Text>
        <Text variant="body2">Hayes Valley Studio</Text>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Input placeholder="Text" />
        <Input
          placeholder="Text"
          size="medium"
          disabled
          tooltip="This is a tooltip!"
        />
        <Input placeholder="Text" size="small" />
        <Input
          placeholder="Text"
          size="small"
          color="error"
          helperText="Error"
        />
        <Input
          placeholder="Text"
          size="small"
          color="warning"
          helperText="Warning"
        />
        <Input placeholder="Text" startNode={<CalendarIcon />} />
        <Input placeholder="Text" endNode={<CalendarIcon />} />
        <Input placeholder="Text" startNode={<CalendarIcon />} />
        <Input multiline placeholder="Text" />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Input placeholder="Text" title="Title" />
        <Input placeholder="Text" size="medium" title="Title" />
        <Input placeholder="Text" size="small" title="Title" />
        <Input
          placeholder="Text"
          size="small"
          color="error"
          helperText="Error"
          title="Title"
        />
        <Input
          placeholder="Text"
          size="small"
          color="warning"
          helperText="Warning"
          title="Title"
        />
        <Input placeholder="Text" title="Title" endNode={<CalendarIcon />} />
        <Input placeholder="Text" title="Title" startNode={<CalendarIcon />} />
        <Input multiline placeholder="Text" title="Title" />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Select options={OPTIONS} placeholder="Text" />
        <Select
          size="small"
          color="warning"
          helperText="Warning"
          placeholder="Select"
          options={OPTIONS}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <InputNumber placeholder="Number" />
        <InputNumber placeholder="Number" title="Title" />
        <InputNumber placeholder="Number" size="small" />
        <InputNumber placeholder="Number" size="small" title="Title" />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <DatePicker placeholder="Text" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="small" title="Title" />
        <DatePicker
          placeholder="Text"
          size="small"
          color="error"
          helperText="Error"
          title="Title"
        />
        <DatePicker
          placeholder="Text"
          size="small"
          color="warning"
          helperText="Warning"
          title="Title"
        />
        <Switch />
        <Switch disabled />
        <Switch checked />
        <Switch checked disabled />
      </Stack>
      <TableLayout headerList={HEADER_LIST}>
        {OPTIONS.map((item, index) => (
          <TableRow key={item.value}>
            <BodyCell>{index + 1}</BodyCell>
            <BodyCell>{item.label}</BodyCell>
            <BodyCell>{item.value}</BodyCell>
          </TableRow>
        ))}
      </TableLayout>
      {/* <DialogLayout
        open
        onClose={() => {
          //
        }}
      >
        1111
      </DialogLayout> */}
      {/* <FormLayout
        open
        label="Add Task"
        onClose={() => {
          //
        }}
      >
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
        <DatePicker placeholder="Text" size="medium" />
      </FormLayout> */}
    </Stack>
  );
}

const OPTIONS = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

const HEADER_LIST = [
  { value: "#", width: "20%" },
  { value: "Name", width: "40%" },
  { value: "Age", width: "40%" },
];
