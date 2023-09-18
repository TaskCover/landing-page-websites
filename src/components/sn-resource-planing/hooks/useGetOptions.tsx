import { IOptionStructure } from "components/sn-time-tracking/Component/Select";
import { useEffect, useState } from "react";
import { usePositions } from "store/company/selectors";
import { useProjects } from "store/project/selectors";
import _ from "lodash";

const useFetchOptions = () => {
  const { onGetProjects } = useProjects();
  const { onGetPositions } = usePositions();
  useEffect(() => {
    onGetProjects({ pageSize: -1, pageIndex: 0 });
    onGetPositions({ pageSize: -1, pageIndex: 0 });
  }, []);
};

const useGetOptions = () => {
  const [projectOptions, setProjectOptions] = useState<IOptionStructure[]>([]);
  const [positionOptions, setPositionOptions] = useState<IOptionStructure[]>(
    [],
  );
  const { items: projects } = useProjects();

  const { items: positions } = usePositions();

  useFetchOptions();
  useEffect(() => {
    if (!_.isEmpty(projects)) {
      const resolveProjects = _.map(projects, (project) => {
        return {
          label: project?.name,
          value: project?.id,
        };
      });
      setProjectOptions(resolveProjects);
    }
  }, [projects]);

  useEffect(() => {
    if (!_.isEmpty(positions)) {
      const resolvePositions = _.map(positions, (position) => {
        return {
          label: position?.name,
          value: position?.id,
        };
      });
      setPositionOptions(resolvePositions);
    }
  }, [positions]);

  return {
    projectOptions,
    positionOptions,
  };
};
export default useGetOptions;
