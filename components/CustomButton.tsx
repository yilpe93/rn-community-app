import { colors } from "@/constants";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled" | "primary" | "secondary" | "standard";
}

function CustomButton({ label, size = "large", variant = "filled", ...props }: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, styles[size], styles[variant], pressed && styles.pressed]}
      {...props}
    >
      <Text style={styles[variant]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  large: {
    width: "100%",
    height: 44,
  },
  medium: {},
  filled: {
    backgroundColor: colors.ORANGE_600,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  secondary: {
    backgroundColor: "#F0F0F0",
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  standard: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default CustomButton;
