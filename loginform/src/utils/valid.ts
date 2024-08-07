import {
  userEmail,
  userName,
  userPassword,
  userRePassword,
} from "../components/LoginForm";

export const isValidUserName = (input: userName): boolean => {
  return input.username.trim().length > 3;
};

export const isValidEmail = (input: userEmail) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(input.email.trim());
};

export const isValidPassword = (input: userPassword) => {
  const re = /^(?=(?:.*[0-9]){2})(?=(?:.*[a-zA-Z]){2}).*$/;
  return re.test(input.password.trim());
};

export const isValidrePassword = (
  input1: userPassword,
  input2: userRePassword
) => {
  if (
    input2.repassword.trim().length > 0 &&
    input1.password.trim() === input2.repassword.trim()
  ) {
    return true;
  }
  return false;
};
