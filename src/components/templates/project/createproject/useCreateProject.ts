import { useEffect, useState } from "react";
import { apiTypeProjectGet, apiUsersGet } from "../../../../utils/apis";
import { showErrorNotify } from "../../../molecules/NotificationMolecule";
import { Props } from "../../../atoms/InputAtom/InputSelectMuiAtom";
import { UsersGet } from "../../../../utils/model";

export const useCreateProject = () => {
  const [picOptions, setPicOptions] = useState<Props["options"]>([]);
  const [projectTypes, setProjectTypes] = useState<Props["options"]>([]);
  const [users, setUsers] = useState<UsersGet["responseBody"]["data"]>([]);

  const getUsers = async () => {
    try {
      const users = await apiUsersGet();
      const picOptions = users.data.map((item) => {
        return { text: item.fullname, value: item.id };
      });
      setPicOptions(picOptions);
      setUsers(users.data);
    } catch (err: any) {
      showErrorNotify(err?.response?.data?.description);
    }
  };

  const getProjectTypes = async () => {
    try {
      const types = await apiTypeProjectGet();
      const typesProjectOption = types.map((type) => {
        return { text: type.name, value: type.id };
      });
      setProjectTypes(typesProjectOption);
    } catch (err: any) {
      showErrorNotify(err?.response?.data?.description);
    }
  };

  useEffect(() => {
    getUsers();
    getProjectTypes();
  }, []);

  return [{ picOptions, projectTypes, users }, {}] as const;
};
