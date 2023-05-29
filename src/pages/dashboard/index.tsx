import type { NextPage } from "next";
import { ManageLayoutAtom } from "../../components/atoms/LayoutAtom/ManageLayoutAtom";
import { ProjectTemplate } from "../../components/templates/project";

const Dashboard: NextPage = () => {
  return (
    <ManageLayoutAtom>
      <ProjectTemplate />
    </ManageLayoutAtom>
  );
};

export default Dashboard;
