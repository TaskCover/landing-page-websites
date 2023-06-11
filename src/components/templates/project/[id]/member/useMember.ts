import { useEffect } from "react";
import { Props } from ".";
import { apiProjectIdGet } from "../../../../../utils/apis";

export const useMember = (props: Props) => {
  const reloadListMember = async () => {
    await apiProjectIdGet(props.id);
  };
  useEffect(() => {
    reloadListMember();
  }, []);

  return [{}, {}] as const;
};
