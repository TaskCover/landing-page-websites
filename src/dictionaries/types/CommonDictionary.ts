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
    };
    title: {
      upload: string;
      uploadImage: string;
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
};