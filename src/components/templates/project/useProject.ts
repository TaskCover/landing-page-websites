import { useState } from "react";
import { Props } from ".";
import { apiProjectGet } from "../../../utils/apis";
import { showErrorNotify } from "../../molecules/NotificationMolecule";
import { ProjectGet } from "../../../utils/model";

export const useProject = (props: Props) => {
  const pageSizeOptions = [
    {
      label: "5",
      value: "5",
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "20",
      value: "20",
    },
    {
      label: "50",
      value: "50",
    },
  ];

  const getPageSize = (propValue?: number) => {
    if (
      !propValue ||
      pageSizeOptions.filter((r) => Number(r.value) === propValue).length <= 0
    ) {
      return 10;
    } else return propValue;
  };

  const [filterState, setFilterState] = useState<Required<Props>>({
    page: props.page || 1,
    pageSize: getPageSize(props.pageSize),
    name: props.name ? props.name : "",
    status: props.status ? props.status : "",
    update_date: props.update_date ? true : false,
    saved: props.saved ? true : false,
  });

  const [projectList, setProjectList] = useState<ProjectGet["responseBody"]>();
  const getListProject = async (
    page?: number,
    size?: number,
    sort?: string,
    others?: { name?: string; status?: string; saved?: boolean }
  ) => {
    try {
      const querySearch = `like(name,"${others?.name ? others.name : ""}")`;
      const querySaved = others?.saved ? `,eq(saved,true)` : "";
      const queryStatus =
        others?.status ||
        others?.status === "ACTIVE" ||
        others?.status === "PAUSE" ||
        others?.status === "CLOSE"
          ? `,eq(status,"${others?.status}")`
          : "";
      const query = "and(" + querySearch + querySaved + queryStatus + ")";
      const data = await apiProjectGet({
        page: page,
        size: size,
        sort: sort,
        query: query,
      });
      setProjectList(data);
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
    }
  };

  const reloadProjectList = async () => {
    getListProject(
      filterState.page - 1,
      filterState.pageSize,
      filterState.update_date ? "updated_time=-1" : undefined,
      {
        name: filterState.name ? filterState.name : "",
        saved: filterState.saved ? true : undefined,
        status: filterState.status,
      }
    );
  };

  return [
    { filterState, pageSizeOptions, projectList },
    { setFilterState, reloadProjectList },
  ] as const;
};
