import type { NextPage } from "next";
import { ProjectTemplate } from "../../components/templates/project";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { Props } from "../../components/templates/project/";

const Project: NextPage = () => {
  const router = useRouter();
  const { page, pageSize, update_date } = router.query;
  const { isReady } = router;
  const [projectProp, setProjectProp] = useState<Props & { isReady: boolean }>({
    isReady: false,
  });

  useEffect(() => {
    if (!isReady) return;
    if (
      typeof page === "string" &&
      typeof pageSize === "string" &&
      !isNaN(Number(page)) &&
      !isNaN(Number(pageSize))
    ) {
      setProjectProp({
        page: Number(page),
        pageSize: Number(pageSize),
        update_date: update_date && update_date === "true" ? true : false,
        isReady: true,
      });
    } else {
      setProjectProp({
        isReady: true,
      });
    }
  }, [isReady]);

  return (
    <>
      {isReady && projectProp.isReady && <ProjectTemplate {...projectProp} />}
    </>
  );
};

export default Project;
