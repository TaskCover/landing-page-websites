import type { NextPage } from "next";
import { ManageLayoutAtom } from "../../../components/atoms/LayoutAtom/ManageLayoutAtom";
import { ProjectTemplate } from "../../../components/templates/project";
import { useRouter } from "next/router";
import React from "react";

const ProjectDetail: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  console.log(id);

  return <React.Fragment>Helllo {id}</React.Fragment>;
};

export default ProjectDetail;
