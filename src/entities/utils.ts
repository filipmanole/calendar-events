import crypto from "crypto";
import KSUID from "ksuid";

export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export const generateKSUID = (timestamp: Date) => {
  const payload = crypto.randomBytes(16);
  return KSUID.fromParts(+timestamp, payload).string;
};

export const getUTCDateString = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
