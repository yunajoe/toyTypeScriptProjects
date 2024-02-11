import classNames from "classnames/bind";
// import "./Button.scss";
import styles from "./Button.module.scss";

export default function Button({ children, size, color, ...rest }: any) {
  const cx = classNames.bind(styles);
  return (
    <button className={cx("buttonContainer", size, color)} {...rest}>
      {children}
    </button>
  );
}
