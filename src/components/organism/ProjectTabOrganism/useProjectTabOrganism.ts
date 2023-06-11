import { useRouter } from "next/router";
import { Props } from ".";

export const useProjectTabOrganism = (props: Props) => {
  const router = useRouter();
  const redirectToPath = (path: string) => {
    router.push(`/project/${props.projectId}/${path}`);
  };

  return [{}, { redirectToPath }] as const;
};
