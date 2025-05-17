import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

function TitleInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="title"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length <= 0) {
            return "제목을 입력해주세요.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="제목"
          placeholder="제목을 입력해주세요."
          returnKeyType="next" // return을 Type에 따라 Text 변경하여 노출
          submitBehavior="submit" // return 시 해당 키보드가 닫히지 않고 이후가 진행
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus("description")}
          error={error?.message}
        />
      )}
    />
  );
}

export default TitleInput;
