import { useState } from "react";
import { ValidationListError } from "./model";

export const useHandleError = () => {
  const [validationError, setValidationError] = useState<
    ValidationListError | undefined
  >();

  const reset = () => {
    setValidationError(undefined);
  };

  const handleError = (e: any) => {
    const errors = e?.response?.data?.errors as ValidationListError;
    if (errors) {
      setValidationError(errors);
    } else {
      reset();
    }
  };

  const getErrorMessage = (field: string): string | undefined => {
    if (!validationError) return;
    const targetError = validationError.filter(
      (error) => error.param === field
    );
    if (targetError && targetError.length > 0) {
      return targetError[0].message;
    }
  };

  return { validationError, handleError, reset, getErrorMessage };
};
