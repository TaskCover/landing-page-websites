import { memo } from "react";
import PencilIcon from "icons/PencilIcon";
import { IconButton } from "components/shared";
import useToggle from "hooks/useToggle";
import { CompanyData } from "store/company/actions";
import { getDataFromKeys } from "utils/index";
import Form from "./Form";
import { useCompany } from "store/company/selectors";

const EditCompany = ({ id }: { id?: string }) => {
  const { item = {} } = useCompany();

  const { onUpdateCompany } = useCompany();

  const [isShow, onShow, onHide] = useToggle();

  const onUpdate = async (data: CompanyData) => {
    if (!id) return;
    return await onUpdateCompany(id, data);
  };

  if (!item) return null;
  return (
    <>
      <IconButton
        onClick={onShow}
        sx={{ bgcolor: "grey.50", p: 0.5, borderRadius: 1 }}
      >
        <PencilIcon sx={{ fontSize: 24 }} />
      </IconButton>

      {isShow && (
        <Form
          open
          onClose={onHide}
          initialValues={
            getDataFromKeys(item, [
              "name",
              "code",
              "address",
              "phone",
            ]) as CompanyData
          }
          onSubmit={onUpdate}
        />
      )}
    </>
  );
};

export default memo(EditCompany);
