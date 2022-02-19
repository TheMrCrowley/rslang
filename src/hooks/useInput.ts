import { ChangeEvent, useEffect, useState } from 'react';

interface Validations {
  isEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
}

const useValidation = (value: string, validations: Validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation]
            ? setMinLength(true)
            : setMinLength(false);
          break;
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'maxLength':
          value.length > validations[validation]
            ? setMaxLength(true)
            : setMaxLength(false);
          break;
        case 'isEmail':
          re.test(String(value).toLocaleLowerCase())
            ? setIsEmail(false)
            : setIsEmail(true);
          break;
        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || isEmail || maxLength || minLength) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLength, maxLength, isEmail]);

  return {
    isEmpty,
    minLength,
    maxLength,
    isEmail,
    inputValid,
  };
};

const useInput = (initialValue: string, validations: Validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

export default useInput;
