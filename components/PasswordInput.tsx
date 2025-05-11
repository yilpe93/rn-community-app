import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import InputField from "./InputField";

interface IProps {
  submitBehavior?: TextInputProps["submitBehavior"];
}

const PasswordInput = ({ submitBehavior = "blurAndSubmit" }: IProps) => {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 8) {
            return "비밀번호는 8자 이상 입력해주세요.";
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          textContentType="oneTimeCode" // Automatic Strong Password Cover Issue 처리 방법
          secureTextEntry
          submitBehavior={submitBehavior}
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus("passwordConfirm")}
          error={error?.message}
        />
      )}
    />
  );
};

export default PasswordInput;
