import { motion } from "framer-motion";
import { ReactNode } from "react";

export const FadeFromSide = ({
  children,
  duration = 0.4,
  delay = 0,
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn = ({
  children,
  duration = 0.35,
  delay = 0,
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export const FadeFromTop = ({
  children,
  duration = 0.35,
  delay = 0,
  isLoading = false,
  style,
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
  isLoading?: boolean;
  style?: any;
}) => {
  if (isLoading) {
    return;
  }

  return (
    <motion.div
      style={{ ...style }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};
