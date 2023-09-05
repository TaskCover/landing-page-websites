import { useCallback, useContext, useState } from "react";
import { EditContext } from "../components/sn-service/context/EditContext";
import { useFormContext } from "react-hook-form";
import { useSalesService } from "store/sales/selectors";
import { reset } from "linkifyjs";
import { ServiceSection } from "store/sales/reducer";
import { useSnackbar } from "store/app/selectors";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_SALES } from "constant/index";

const useServiceHeader = () => {
  const { setEdit } = useContext(EditContext);
  const { serviceSectionList, onGetService } = useSalesService();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  const {
    getValues,
    formState: { dirtyFields },
    reset,
  } = useFormContext();

  const { onUpdateSection } = useSalesService();

  const isChanged = dirtyFields?.sectionsList;

  const onSaveChange = useCallback(
    async (data) => {
      setEdit && setEdit(false);
      const { sectionsList } = data;
      if (!isChanged) return;
      const fetch = sectionsList.map(
        (section, index) =>
          new Promise((resolve) => {
            {
              const { service } = section;
              onUpdateSection({
                sectionId: section.id,
                data: {
                  services: [...service],
                  start_date: getValues("start_date"),
                },
              });
            }
            resolve(true);
          }),
      );

      const isSuccessful = await Promise.all(fetch).then(async () => {
        await onGetService(getValues("id"));
        return true;
      });

      if (isSuccessful) {
        reset(data);
        onAddSnackbar(
          commonT("notification.success", {
            label: `${commonT("update")} ${salesT(
              "detail.service.title",
            ).toLowerCase()}`,
          }),
          "success",
        );
      }
    },
    [isChanged],
  );

  const onCancel = useCallback(() => {
    setEdit && setEdit(false);
    reset({
      ...getValues(),
      sectionsList: serviceSectionList,
    });
  }, [serviceSectionList]);

  return {
    onCancel,
    onSaveChange,
  };
};

export default useServiceHeader;
