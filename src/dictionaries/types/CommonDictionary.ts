export type CommonDictionary = {
  app: {
    title: string;
    description: string;
  };
  form: {
    error: {
      required: string;
      invalid: string;
      minAndMax: string;
      confirmNotMatch: string;
      notSame: string;
      existed: string;
      notExist: string;
      incorrect: string;
      overMax: string;
      datePast: string;
      gte: string;
    };
    title: {
      upload: string;
      uploadImage: string;
      assigner: string;
      startDate: string;
      endDate: string;
      description: string;
    };
    confirm: string;
    cancel: string;
  };
  notification: {
    imageTypeInvalid: string;
  };
  error: {
    anErrorTryAgain: string;
    anErrorTryReload: string;
    noData: string;
  };
  position: string;
  fullName: string;
  phone: string;
  status: string;
  filter: {
    refresh: string;
    clear: string;
    status: {
      active: string;
      close: string;
      pause: string;
    };
  };
  createNew: string;
  update: string;
  edit: string;
  close: string;
  search: string;
  assigner: string;
  name: string;
  paging: {
    show: string;
    outOf: string;
  };
  statusEnum: {
    active: string;
    close: string;
    pause: string;
  };
  searchBy: string;
};
