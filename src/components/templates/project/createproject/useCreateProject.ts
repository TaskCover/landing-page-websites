import { useEffect, useState } from "react";
import {
  apiPositionsGet,
  apiProjectPost,
  apiTypeProjectGet,
  apiUsersGet,
} from "../../../../utils/apis";
import { showErrorNotify } from "../../../molecules/NotificationMolecule";
import { Props } from "../../../atoms/InputAtom/InputSelectMuiAtom";
import { Props as ComponentProps } from "./";
import { ProjectPost, UsersGet } from "../../../../utils/model";
import { useForm } from "react-hook-form";
import { useHandleError } from "../../../../utils/useHandleError";

export const useCreateProject = (props: ComponentProps) => {
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

  const [formData, setFormData] = useState<ProjectPost["requestBody"]>({});
  const { register, handleSubmit: submit } = useForm();
  const { getErrorMessage, handleError } = useHandleError();

  const onSubmit = async (data: ProjectPost["requestBody"]) => {
    try {
      await apiProjectPost({
        ...data,
        ...formData,
        member: listPartnerValue?.map((partner) => {
          return { id: partner.userId, position: partner.positionId };
        }),
      });
      await props.handleClose();
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
      handleError(e);
    }
  };
  const handleSubmit = submit(onSubmit);

  const handleOwnerChange = (value: string) => {
    setFormData({ ...formData, owner: value });
  };

  const handleTypeProjectChange = (value: string) => {
    setFormData({ ...formData, type_project: value });
  };

  const handleStartDateChange = (value: string) => {
    setFormData({ ...formData, start_date: value });
  };

  const handleEndDateChange = (value: string) => {
    setFormData({ ...formData, end_date: value });
  };

  const handleDescriptionChange = (value: string) => {
    setFormData({ ...formData, description: value });
  };

  return [
    { picOptions, projectTypes, positions, users, listPartnerValue },
    {
      setListParterValue,
      handleSubmit,
      handleOwnerChange,
      handleTypeProjectChange,
      handleStartDateChange,
      handleEndDateChange,
      handleDescriptionChange,
      register,
      getErrorMessage,
    },
  ] as const;
};
