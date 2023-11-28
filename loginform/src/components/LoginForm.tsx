import { useState } from "react";
import styles from "./LoginFrom.module.css";

interface userName {
  username: string;
}

interface userEmail {
  email: string;
}
interface userPassword {
  password: string;
}
interface userRePassword {
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
  const [validPassWrodInput, setValidPasswordInput] = useState<
    boolean | undefined
  >(undefined);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setUserName(e.target.value);
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

  // username 유효성 검사하기
  const isValidUserName = (input: userName): boolean => {
    return input.username.trim().length > 3;
  };

  // useremail유효성 검사하기
  const isValidEmail = (input: userEmail) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(input.email.trim());
  };

  // password 유효성 검사하기

  const isValidPassword = (input: userPassword, input2: userRePassword) => {
    if (input.password === input2.repassword) {
      return true;
    }
    return false;
  };

  // form 제출하기
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

    // passwor유쇼어
    if (isValidPassword(password, rePassWord)) {
      setValidPasswordInput(true);
    } else if (!isValidPassword(password, rePassWord)) {
      setValidPasswordInput(false);
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
          className={styles.input}
          type="password"
          onChange={handleChangePassword}
        />
      </div>
      <div className={styles.input__container}>
        <label className={styles.label}>Confirm Password</label>
        <input
          className={
            formSubmiited
              ? validPassWrodInput
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
