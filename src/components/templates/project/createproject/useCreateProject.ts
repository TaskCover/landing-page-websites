import { useEffect, useState } from "react";
import {
  apiPositionsGet,
  apiProjectPost,
  apiProjectPut,
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
  const { projectUpdate } = props;
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

  useEffect(() => {
    if (!projectUpdate) return;
    setListParterValue(
      projectUpdate.members.map((member) => {
        return { userId: member.id, positionId: member.position };
      })
    );
  }, [projectUpdate]);

  const [owner, setOwner] = useState("");
  const [typeProject, setTypeProject] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const { register, handleSubmit: submit } = useForm();
  const { getErrorMessage, handleError } = useHandleError();

  const onSubmit = async (data: ProjectPost["requestBody"]) => {
    try {
      const requestBody = {
        ...data,
        owner: owner,
        type_project: typeProject,
        start_date: startDate,
        end_date: endDate,
        description: description,
        member: listPartnerValue?.map((partner) => {
          return { id: partner.userId, position: partner.positionId };
        }),
      };
      if (!projectUpdate) {
        await apiProjectPost(requestBody);
      } else {
        await apiProjectPut(projectUpdate.id, requestBody);
      }
      await props.handleClose();
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
      handleError(e);
    }
  };
  const handleSubmit = submit(onSubmit);

  const handleOwnerChange = (value: string) => {
    setOwner(value);
  };

  const handleTypeProjectChange = (value: string) => {
    setTypeProject(value);
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  return [
    {
      picOptions,
      projectTypes,
      positions,
      users,
      listPartnerValue,
      projectUpdate,
    },
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
