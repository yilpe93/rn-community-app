import { colors } from "@/constants";
import React, { ForwardedRef, forwardRef } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "standard" | "outlined";
  error?: string;
}

function InputField({ label, variant = "filled", error, ...props }: InputFieldProps, ref?: ForwardedRef<TextInput>) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.container, styles[variant], Boolean(error) && styles.inputError]}>
        <TextInput
          ref={ref}
          autoCapitalize="none" // 첫 글자 대문자 활성화/비활성화
          spellCheck={false}
          autoCorrect={false}
          placeholderTextColor={colors.GRAY_500}
          style={[styles.input]}
          {...props}
        />
      </View>

      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginBottom: 5,
  },
  container: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  standard: {},
  outlined: {},
  inputError: {
    backgroundColor: colors.RED_100,
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  error: {
    fontSize: 12,
    marginVertical: 10,
    color: colors.RED_500,
  },
});

export default forwardRef(InputField);
