import { useContext } from "react";
import { EditContext } from "../components/sn-service/context/EditContext";

const useServiceHeader = () => {
  const { setEdit } = useContext(EditContext);
  const onSaveChange = () => {
    setEdit && setEdit(false);
  };
  return {
    onSaveChange,
  };
};

export default useServiceHeader;
