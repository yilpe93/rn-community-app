import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

const EmailInput = () => {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "이메일을 입력해주세요.";
          }

          if (!/[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(data)) {
            return "올바른 이메일 형식이 아닙니다.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="이메일"
          placeholder="이메일을 입력하세요"
          inputMode="email" // 노출되는 키보드 타입
          returnKeyType="next" // return을 Type에 따라 Text 변경하여 노출
          submitBehavior="submit" // return 시 해당 키보드가 닫히지 않고 이후가 진행
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus("password")}
          error={error?.message}
        />
      )}
    />
  );
};

export default EmailInput;
