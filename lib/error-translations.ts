import { authClient } from "./auth-client";

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      fr: string;
    }
  >
>;

export const errorCodes = {
  USER_ALREADY_EXISTS: {
    fr: "L'utilisateur existe déjà",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    fr: "Email ou mot de passe invalide",
  },
  EMAIL_NOT_VERIFIED: {
    fr: "Email non vérifié",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string) => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes].fr;
  }
  return "";
}; 