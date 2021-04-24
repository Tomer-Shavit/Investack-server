import { PASSWORD_RESPONSES } from "../constants";
import { UserLoginInput, FieldErrors } from "../resolvers/user";
import { passwordValidation } from "./passwordValidatior";

export const checkRegisterInput = ({
  email,
  password,
}: UserLoginInput): FieldErrors[] | null => {
  if (!email.includes("@")) {
    return [
      {
        field: "email",
        error: "Invalid email",
      },
    ];
  } else if (!email.includes(".")) {
    return [
      {
        field: "email",
        error: "Invalid email",
      },
    ];
  }
  const response: string[] = passwordValidation.validate(password, {
    list: true,
  });

  if (response.length > 0) {
    return [
      {
        field: "password",
        error: PASSWORD_RESPONSES[response[0]],
      },
    ];
  }

  return null;
};
