import { useEffect, useMemo, useState } from "react";
import { usePositions } from "store/company/selectors";
import { useProjects } from "store/project/selectors";
import _ from "lodash";
import { IOptionStructure } from "components/shared/TextFieldSelect";
import { RESOURCE_ALLOCATION_TYPE } from "constant/enums";
import { NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";

export const useFetchOptions = () => {
  const { onGetProjects } = useProjects();
  const { onGetPositions } = usePositions();
  useEffect(() => {
    onGetProjects({ pageSize: -1, pageIndex: 0 });
    onGetPositions({ pageSize: -1, pageIndex: 0 });
  }, []);
};

const useGetOptions = () => {
  // const [projectOptions, setProjectOptions] = useState<IOptionStructure[]>([]);
  // const [positionOptions, setPositionOptions] = useState<IOptionStructure[]>(
  //   [],
  // );
  const { items: projects } = useProjects();
  const { items: positions } = usePositions();
  const commonT = useTranslations(NS_COMMON);
  const projectOptions: IOptionStructure[] = useMemo(() => {
    if (!_.isEmpty(projects)) {
      const resolveProjects = _.map(projects, (project) => {
        return {
          label: project?.name,
          value: project?.id,
        };
      });
      return resolveProjects;
    }
    return [];
  }, [JSON.stringify(projects)]);

  const positionOptions: IOptionStructure[] = useMemo(() => {
    if (!_.isEmpty(positions)) {
      const resolvePositions = _.map(positions, (position) => {
        return {
          label: position?.name,
          value: position?.id,
        };
      });
      return resolvePositions;
    }
    return [];
  }, [JSON.stringify(positions)]);

  const timeOptions = useMemo(
    () => [
      {
        label: `h/${commonT("day")}`,
        value: RESOURCE_ALLOCATION_TYPE.HOUR_PER_DAY,
      },
      {
        label: "%",
        value: RESOURCE_ALLOCATION_TYPE.PERCENTAGE,
      },
      {
        label: commonT("hour"),
        value: RESOURCE_ALLOCATION_TYPE.HOUR,
      },
    ],
    [],
  );
  return {
    projectOptions,
    timeOptions,
    positionOptions,
  };
};
export default useGetOptions;
