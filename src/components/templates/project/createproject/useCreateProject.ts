import { useEffect, useState } from "react";
import {
  apiPositionsGet,
  apiTypeProjectGet,
  apiUsersGet,
} from "../../../../utils/apis";
import { showErrorNotify } from "../../../molecules/NotificationMolecule";
import { Props } from "../../../atoms/InputAtom/InputSelectMuiAtom";
import { UsersGet } from "../../../../utils/model";

export const useCreateProject = () => {
  const [picOptions, setPicOptions] = useState<Props["options"]>([]);
  const [projectTypes, setProjectTypes] = useState<Props["options"]>([]);
  const [users, setUsers] = useState<UsersGet["responseBody"]["data"]>([]);
  const [positions, setPositions] = useState<Props["options"]>([]);
  const [listPartnerValue, setListParterValue] = useState<
    { userId: string; positionId: string }[] | undefined
  >();

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

  const getPostions = async () => {
    try {
      const postions = await apiPositionsGet();
      const positionsOptions = postions.map((postion) => {
        return { text: postion.name, value: postion.id };
      });
      setPositions(positionsOptions);
    } catch (err: any) {
      showErrorNotify(err?.response?.data?.description);
    }
  };

  useEffect(() => {
    getUsers();
    getProjectTypes();
    getPostions();
  }, []);

  return [
    { picOptions, projectTypes, positions, users, listPartnerValue },
    { setListParterValue },
  ] as const;
};
