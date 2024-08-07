import { useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidrePassword,
  isValidUserName,
} from "../utils/valid";
import styles from "./LoginFrom.module.css";

export interface userName {
  username: string;
}

export interface userEmail {
  email: string;
}
export interface userPassword {
  password: string;
}
export interface userRePassword {
  repassword: string;
}

export default function LoginForm() {
  const [userName, setUserName] = useState<userName>({ username: "" });
  const [userEmail, setUserEmail] = useState<userEmail>({ email: "" });
  const [password, setPassWord] = useState<userPassword>({ password: "" });
  const [rePassWord, setRePassWord] = useState<userRePassword>({
    repassword: "",
  });
  const [formSubmiited, setFormSumitted] = useState<boolean>(false);
  const [valiedInput, setValidInput] = useState<boolean | undefined>(undefined);
  const [validEmailInput, setValidEmailInput] = useState<boolean | undefined>(
    undefined
  );
  const [validPasswordInput, setValidPasswordInput] = useState<
    boolean | undefined
  >(undefined);

  const [validrePasswordInput, setValidrePasswordInput] = useState<
    boolean | undefined
  >(undefined);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName({ username: e.target.value });
  };

  const handeChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail({ email: e.target.value });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassWord({ password: e.target.value });
  };
  const handleChangerePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassWord({ repassword: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // username 유효성
    setFormSumitted(true);

    if (isValidUserName(userName)) {
      setValidInput(true);
    } else if (!isValidUserName(userName)) {
      setValidInput(false);
    }
    // email유효성
    if (isValidEmail(userEmail)) {
      setValidEmailInput(true);
    } else if (!isValidEmail(userEmail)) {
      setValidEmailInput(false);
    }

    // password유효성
    if (isValidPassword(password)) {
      setValidPasswordInput(true);
    } else {
      setValidPasswordInput(false);
    }

    // repassword 유효성
    if (isValidrePassword(password, rePassWord)) {
      setValidrePasswordInput(true);
    } else {
      setValidrePasswordInput(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1>Register With Us</h1>
      <div className={styles.input__container}>
        <label className={styles.label}>Username</label>
        <input
          className={
            formSubmiited
              ? valiedInput
                ? styles.input__valid
                : styles.input__invalid
              : styles.input
          }
          type="text"
          onChange={handleChangeName}
        />
      </div>
      <div className={styles.input__container}>
        <label className={styles.label}>Email</label>
        <input
          className={
            formSubmiited
              ? validEmailInput
                ? styles.input__valid
                : styles.input__invalid
              : styles.input
          }
          type="text"
          onChange={handeChangeEmail}
        />
      </div>
      <div className={styles.input__container}>
        <label className={styles.label}>Password</label>
        <input
          className={
            formSubmiited
              ? validPasswordInput
                ? styles.input__valid
                : styles.input__invalid
              : styles.input
          }
          type="password"
          onChange={handleChangePassword}
        />
      </div>
      <div className={styles.input__container}>
        <label className={styles.label}>Confirm Password</label>
        <input
          className={
            formSubmiited
              ? validrePasswordInput
                ? styles.input__valid
                : styles.input__invalid
              : styles.input
          }
          type="password"
          onChange={handleChangerePassword}
        />
      </div>
      {/* button의 type형태는 button과 submit 형태가 있다. button형태는 해당 버튼이 클릭할 수 있는 버튼(clickable button)임을 명시함. */}
      {/* button의 type형태는 button과 submit 형태가 있다. submit형태는	해당 버튼이 폼 데이터(form data)를 제출하는 제출 버튼(submit button)임을 명시함.. */}
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
}
