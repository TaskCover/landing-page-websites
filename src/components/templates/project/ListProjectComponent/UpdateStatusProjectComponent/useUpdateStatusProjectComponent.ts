import { useState } from "react";
import { Props } from ".";
import { apiProjectPut } from "../../../../../utils/apis";
import { showErrorNotify } from "../../../../molecules/NotificationMolecule";

export const useUpdateStatusProjectComponent = (props: Props) => {
  const options = [
    { label: "Hoạt động", value: "ACTIVE" },
    { label: "Tạm dừng", value: "PAUSE" },
    { label: "Kết thúc", value: "CLOSE" },
  ];

  const [selected, setSelected] = useState(props.currentStatus);

  const isCheckedDefault = (label: string) => {
    if (label === selected) return true;
    else return false;
  };

  const handleChangeStatus = async () => {
    try {
      await apiProjectPut(props.projectId, { status: selected });
      props.closeModal();
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
    }
  };

  return [
    { options, selected },
    { isCheckedDefault, setSelected, handleChangeStatus },
  ] as const;
};
