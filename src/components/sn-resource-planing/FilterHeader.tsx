import { Button, SelectChangeEvent, Stack } from "@mui/material";
import { Search } from "components/Filters";
import Filter from "components/sn-time-tracking/Component/Filter";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import { useTranslations } from "next-intl";
import { WorkingStatus } from "store/resourcePlanning/action";

const FilterHeader = () => {
  const resourceT = useTranslations<string>(NS_RESOURCE_PLANNING);
  const commonT = useTranslations<string>(NS_COMMON);

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Stack
        sx={{
          border: {
            xs: "none",
            md: "1px solid",
          },
          borderColor: {
            xs: "transparent",
            md: "grey.100",
          },
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          padding: {
            xs: "0",
            md: "8px 16px",
          },
          borderRadius: "4px",
        }}
        width={{
          xs: "100%",
          md: "auto",
        }}
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing="16px"
      >
        <Search
          name="search"
          placeholder={resourceT("schedule.filter.search")}
          sx={{
            maxWidth: "402px",
            height: "40px",
            " .MuiInputBase-root": {
              maxWidth: "295px",
              height: "40px",
            },
          }}
        />
        <Stack direction="row" spacing="16px">
          <Filter.Select
            value="position"
            onChange={(event) => console.log(event.target.value)}
            label={commonT("position")}
            sx={{ maxWidth: "200px" }}
            options={[]}
          />
          <Filter.Select
            value="workingHours"
            onChange={(event) => console.log(event.target.value)}
            label={resourceT("schedule.filter.workingHours")}
            sx={{ width: "150px" }}
            options={[
              {
                label: resourceT("schedule.filter.status.active"),
                value: WorkingStatus.ACTIVE,
              },
              {
                label: resourceT("schedule.filter.status.pending"),
                value: WorkingStatus.PENDING,
              },
              {
                label: resourceT("schedule.filter.status.inactive"),
                value: WorkingStatus.INACTIVE,
              },
            ]}
          />
        </Stack>
        <Button
          variant="contained"
          sx={{
            maxWidth: "295px",
            height: "40px",
            backgroundColor: "#",
            " .MuiInputBase-root": {
              maxWidth: "295px",
              height: "40px",
            },
          }}
        >
          {commonT("search")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default FilterHeader;
