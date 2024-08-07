import styles from "../App.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Divider() {
  return (
    <div className={cx("yellow-line-wrapper")}>
      <div className={cx("yellow-line")}></div>
      <div className={cx("yellow-line")}></div>
    </div>
  );
}
