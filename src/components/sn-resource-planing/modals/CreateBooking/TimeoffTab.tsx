import { yupResolver } from "@hookform/resolvers/yup";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { schemaTimeOff } from "./Schemas";
import TextFieldSelect from "components/sn-time-tracking/Component/Select";
import CustomDateRangePicker from "components/sn-resource-planing/components/CustomDateRangePicker";
import TextFieldInput from "components/shared/TextFieldInput";
import { useEffect, useState } from "react";
import useTheme from "hooks/useTheme";
import { Stack } from "@mui/material";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import Textarea from "components/sn-time-tracking/Component/Textarea";
import { Button } from "components/shared";
interface IProps {
  open: boolean;
  onClose(): void;
}

const TimeOffTab = ({ open, onClose }: IProps) => {
  const [isFocusAllocation, setIsFocusAllocation] = useState(false);
  const { palette } = useTheme();
  const commonT = useTranslations(NS_COMMON);
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);

  const {
    control: controlTimeOff,
    handleSubmit: handleSubmitTimeOff,
    // setValue: setValueTimeOff,
    // clearErrors: clearErrorsTimeOff,
    watch: watchTimeOff,
    reset: resetTimeOff,
    formState: { errors: errorsTimeOff },
  } = useForm({
    resolver: yupResolver(schemaTimeOff),
    defaultValues: {
      categoryTimeOff: "",
      dateRange: {
        startDate: undefined,
        endDate: undefined,
      },
      workingTime: undefined,
      allocation: "",
      allocation_type: "hour",
      note: "",
    },
  });

  useEffect(() => {
    if (!open) {
      resetTimeOff();
    }
  }, [open]);

  const onSubmitTimeOff = (data) => {
    console.log("data", data, watchTimeOff);
  };

  return (
    <Grid2 container spacing={2} sx={{ mt: 1 }}>
      <Grid2 xs={12}>
        <Controller
          name="categoryTimeOff"
          control={controlTimeOff}
          render={({ field }) => (
            <TextFieldSelect
              value={field.value}
              helperText={errorsTimeOff.categoryTimeOff?.message}
              error={!!errorsTimeOff.categoryTimeOff?.message}
              required
              options={[]}
              label={resourceT("form.selectTimeOffCategory")}
            />
          )}
        />
      </Grid2>
      <Grid2 container xs={12}>
        <Grid2 xs={12} md={6}>
          <Controller
            name="dateRange"
            control={controlTimeOff}
            render={({ field }) => (
              <CustomDateRangePicker
                required
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                label={resourceT("form.dateRange")}
                placeholder=""
                error={!!errorsTimeOff.dateRange?.message}
                helperText={errorsTimeOff.dateRange?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Stack
            direction="row"
            sx={{
              ".text-field-input-container, .text-field-select-container": {
                border: `1px solid transparent`,
                transition: "border-color 0.3s ease",
              },
              border: `1px solid ${
                isFocusAllocation ? palette.primary.main : "transparent"
              }`,
              "&:focus-within": {
                borderColor: palette.primary.main,
              },
            }}
          >
            <Controller
              name="allocation"
              control={controlTimeOff}
              render={({ field }) => (
                <TextFieldInput
                  label={resourceT("form.allocation")}
                  placeholder="8h"
                  sx={{
                    borderRight: "1px solid #BABCC6",
                  }}
                  helperText={errorsTimeOff.allocation?.message}
                  error={!!errorsTimeOff.allocation?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="allocation_type"
              control={controlTimeOff}
              render={({ field }) => (
                <TextFieldSelect
                  value={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}
                  options={[
                    {
                      label: `h/${commonT("day")}`,
                      value: `h/day`,
                    },
                    {
                      label: "%",
                      value: "%",
                    },
                    {
                      label: commonT("hour"),
                      value: "hour",
                    },
                  ]}
                  onFocus={() => setIsFocusAllocation(true)}
                  onBlur={() => setIsFocusAllocation(false)}
                />
              )}
            />
          </Stack>
        </Grid2>
      </Grid2>
      <Grid2 xs={12}>
        <Textarea
          value=""
          onChange={() => {
            console.log("a");
          }}
          label={resourceT("form.note")}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" justifyContent="center" gap={3}>
          <Button
            variant="primaryOutlined"
            size="medium"
            onClick={onClose}
            sx={{
              width: 150,
              height: 40,
            }}
          >
            {commonT("form.cancel")}
          </Button>
          <Button
            sx={{
              width: 160,
              height: 40,
            }}
            variant="contained"
            onClick={handleSubmitTimeOff(onSubmitTimeOff)}
          >
            {resourceT("form.createBooking")}
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default TimeOffTab;
