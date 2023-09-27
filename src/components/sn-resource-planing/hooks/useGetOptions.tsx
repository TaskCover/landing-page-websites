import { IOptionStructure } from "components/sn-time-tracking/Component/Select";
import { useEffect, useMemo, useState } from "react";
import { usePositions } from "store/company/selectors";
import { useProjects } from "store/project/selectors";
import _ from "lodash";

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

  return {
    projectOptions,
    positionOptions,
  };
};
export default useGetOptions;
