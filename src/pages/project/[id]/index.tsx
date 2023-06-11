import type { NextPage } from "next";
import { ManageLayoutAtom } from "../../../components/atoms/LayoutAtom/ManageLayoutAtom";
import { useRouter } from "next/router";
import React from "react";
import { ProjectTabOrganism } from "../../../components/organism/ProjectTabOrganism";

const ProjectDetail: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  if (typeof id !== "string") return null;

  return (
    <ManageLayoutAtom>
      <ProjectTabOrganism tabIndex={0} projectId={id} />
    </ManageLayoutAtom>
  );
};

export default ProjectDetail;
