import { useState } from "react";

const useInput = (validateInput: (value: string | number) => boolean) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const isInputValid = validateInput(enteredValue);

  const hasError = !enteredValue && !isInputValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    isTouched,
    hasError,
    isValid: isInputValid,
    changeHandler: valueChangeHandler,
    blurHandler,
  };
};

export default useInput;
