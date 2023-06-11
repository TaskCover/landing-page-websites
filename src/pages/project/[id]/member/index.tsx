import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ManageLayoutAtom } from "../../../../components/atoms/LayoutAtom/ManageLayoutAtom";
import { ProjectTabOrganism } from "../../../../components/organism/ProjectTabOrganism";
import { ProjectMember } from "../../../../components/templates/project/[id]/member";

const ProjectDetail: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  if (typeof id !== "string") return null;

  return <ProjectMember id={id} />;
};

export default ProjectDetail;
