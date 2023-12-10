import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { NS_PROJECT } from "constant/index";
import { BodyCell, CellProps } from "components/Table";
import { TBudgets } from "store/project/budget/action";
import { Checkbox, Text } from "components/shared";
import { Stack, TableRow, formLabelClasses } from "@mui/material";
import { HEADER_HEIGHT } from "layouts/Header";
import { TableLayoutWithScroll } from "components/Table/TableLayoutWithScroll";
import Link from "components/Link";
import { getPath } from "utils/index";
import { BUDGET_DETAIL_PATH } from "constant/paths";
import Avatar from "components/Avatar";

type Props = {
  idSelecteds: string[];
  setIdSelected: any;
  budgets: TBudgets;
};

export const ItemWithoutProject = ({
  idSelecteds,
  setIdSelected,
  budgets,
}: Props) => {
  const projectT = useTranslations(NS_PROJECT);

  const getXsCell = (index: number) => {
    return {
      width: desktopHeaderList[index].width + "!important",
      minWidth: desktopHeaderList[index].minwidth + "!important",
      maxWidth: desktopHeaderList[index].width + "!important",
    };
  };

  const desktopHeaderList: CellProps[] = useMemo(() => {
    return [
      {
        value: (
          <Checkbox
            checked={idSelecteds.length === budgets.length}
            onChange={() => {
              if (idSelecteds.length === budgets.length) {
                setIdSelected([]);
                return;
              }
              const ids = budgets.map((budget) => budget.id);
              setIdSelected(ids);
            }}
          />
        ),
        align: "center",
        minwidth: "56px",
        width: "56px",
      },
      {
        value: projectT("budget.table.budget"),
        align: "left",
        width: "220px",
        minwidth: "220px",
      },
      {
        value: projectT("budget.table.company"),
        align: "left",
        width: "150px",
        minwidth: "150px",
      },
      {
        value: projectT("budget.table.project"),
        align: "left",
        width: "220px",
        minwidth: "220px",
      },
      {
        value: projectT("budget.table.revenue"),
        align: "center",
        width: "160px",
        minwidth: "160px",
        data: "$109,000,567",
      },
      {
        value: projectT("budget.table.margin"),
        align: "center",
        data: "69.04%",
        width: "100px",
        minwidth: "100px",
      },
      {
        value: projectT("budget.table.budgetedTimeUse"),
        align: "center",
        data: "350:00h/599:00h ",
        width: "200px",
        minwidth: "200px",
      },
      {
        value: projectT("budget.table.invoiced"),
        align: "center",
        data: "47.5%",
        width: "140px",
        minwidth: "140px",
      },
    ];
  }, [idSelecteds, budgets]);

  const selectBudget = (id: string) => {
    const indexExist = idSelecteds.findIndex((idBudget) => idBudget === id);
    if (indexExist === -1) {
      idSelecteds.push(id);
    } else {
      delete idSelecteds[indexExist];
    }
    setIdSelected(idSelecteds.filter(Boolean));
  };

  return (
    <TableLayoutWithScroll
      headerList={desktopHeaderList}
      noData={false}
      titleColor="grey.300"
      containerHeaderProps={{
        sx: {
          maxHeight: { xs: 0, md: undefined },
          minHeight: { xs: 0, md: HEADER_HEIGHT },
        },
      }}
    >
      {budgets?.map((budget) => {
        return (
          <TableRow key={budget.id}>
            <BodyCell sx={{ pl: { xs: 0.5, md: 2 }, ...getXsCell(0) }}>
              <Checkbox
                checked={idSelecteds.indexOf(budget.id) !== -1}
                onChange={() => {
                  selectBudget(budget.id);
                }}
              />
            </BodyCell>
            <BodyCell sx={getXsCell(1)}>
              {budget.created_by && typeof budget.created_by === "object" && (
                <Link
                  href={getPath(BUDGET_DETAIL_PATH, undefined, {
                    id: budget.id as string,
                  })}
                  underline="none"
                  sx={{
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                    "&:hover *": {
                      color: "primary.main",
                    },
                  }}
                >
                  <Avatar src={budget?.created_by?.avatar?.link} size={35} />
                  <Text paddingLeft="10px" align="left">
                    {budget.name}
                  </Text>
                </Link>
              )}
            </BodyCell>
            <BodyCell sx={getXsCell(2)}>
              {budget.project?.avatar &&
                typeof budget.project.avatar[0] === "object" && (
                  <Stack direction="row" alignItems="center">
                    <Avatar src={budget.project.avatar[0].link} size={35} />
                    <Text paddingLeft="10px" align="left">
                      {budget.company}
                    </Text>
                  </Stack>
                )}
            </BodyCell>
            <BodyCell sx={getXsCell(3)}>
              {budget.project?.avatar &&
                typeof budget.project.avatar[0] === "object" && (
                  <Stack direction="row" alignItems="center">
                    <Avatar src={budget.project.avatar[0].link} size={35} />
                    <Text paddingLeft="10px" align="left">
                      {budget.project.name}
                    </Text>
                  </Stack>
                )}
            </BodyCell>
            <BodyCell sx={getXsCell(4)}>
              <Text>$109,000,567</Text>
            </BodyCell>
            <BodyCell sx={getXsCell(5)}>
              <Text>69.04%</Text>
            </BodyCell>
            <BodyCell sx={getXsCell(6)}>
              <Text>350:00h/599:00h</Text>
            </BodyCell>
            <BodyCell sx={getXsCell(7)}>
              <Text>47.5%</Text>
            </BodyCell>
          </TableRow>
        );
      })}
    </TableLayoutWithScroll>
  );
};
