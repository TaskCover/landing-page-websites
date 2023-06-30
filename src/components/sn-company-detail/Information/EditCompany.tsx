import { memo, useMemo } from "react";
import PencilIcon from "icons/PencilIcon";
import { IconButton } from "components/shared";
import useToggle from "hooks/useToggle";
import { CompanyData } from "store/company/actions";
import { getDataFromKeys } from "utils/index";
import Form from "./Form";
import { useMyCompany } from "store/company/selectors";
import { useParams } from "next/navigation";
import { useCompany } from "store/manager/selectors";

const EditCompany = () => {
  const { item: detailItem } = useCompany();
  const { item: myItem, onUpdateMyCompany } = useMyCompany();
  const { id: paramId } = useParams();

  const item = useMemo(() => {
    if (paramId) {
      return detailItem ?? {};
    }
    return myItem ?? {};
  }, [detailItem, paramId, myItem]);

  const id = useMemo(() => paramId ?? myItem?.id, [myItem?.id, paramId]);

  const { onUpdateCompany } = useCompany();

  const [isShow, onShow, onHide] = useToggle();

  const onUpdate = async (data: CompanyData) => {
    if (!id) return;

    let dataOnlyUpdated = { ...data };

    dataOnlyUpdated = Object.entries(dataOnlyUpdated).reduce(
      (out, [key, value]) => {
        if (item[key] !== value) {
          out[key] = value;
        }
        return out;
      },
      {},
    ) as CompanyData;

    if (paramId) {
      return await onUpdateCompany(id, dataOnlyUpdated);
    }
    return await onUpdateMyCompany(dataOnlyUpdated);
  };

  if (!item || id) return null;
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
              "address",
              "phone",
              "tax_code",
            ]) as CompanyData
          }
          onSubmit={onUpdate}
        />
      )}
    </>
  );
};

export default memo(EditCompany);
