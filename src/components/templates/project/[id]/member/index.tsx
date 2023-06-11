import { ManageLayoutAtom } from "../../../../atoms/LayoutAtom/ManageLayoutAtom";
import { ProjectTabOrganism } from "../../../../organism/ProjectTabOrganism";
import { useMember } from "./useMember";

export type Props = {
  id: string;
};

export const ProjectMember = (props: Props) => {
  const [values, handlers] = useMember(props);

  return (
    <ManageLayoutAtom>
      <ProjectTabOrganism tabIndex={3} projectId={props.id} />
    </ManageLayoutAtom>
  );
};
