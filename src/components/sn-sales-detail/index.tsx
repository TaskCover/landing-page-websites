"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Sales } from "store/sales/reducer";
import SalesDetail from "./SaleDetail";
import { SALE_STAGE } from "constant/enums";

const SaleForm = ({ params }) => {
  // form control
  const method = useForm<Sales>({
    defaultValues: {
      name: "",
      description: "",
      avatar: [],
      activity: [],
      comment: [],
      company: "",
      created_time: "",
      created_by: {},
      currency: "",
      estimate: 0,
      id: params.id,
      is_active: false,
      member: [],
      owner: {},
      probability: 0,
      revenue: 0,
      revenuePJ: 0,
      stage: "",
      start_date: "",
      tags: [],
      updated_time: "",
      status: SALE_STAGE.LEAD,
    },
  });

  return (
    <FormProvider {...method}>
      <SalesDetail />
    </FormProvider>
  );
};

export default SaleForm;
