import styles from "./DropDown.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

// https://github.com/fraserxu/react-dropdown/blob/master/index.js
function DropDownJS({ menus, defaultOption, isOpen, handleMenuClick }) {
  // console.log("mm", menus);

  const buildMenu = () => {
    return (
      <div className={cx("dropdown__container")}>
        {menus.map((menu) => {
          return (
            <li
              onClick={() => handleMenuClick(menu)}
              하이={handleMenuClick(menu)}
            >
              {menu}
            </li>
          );
        })}
      </div>
    );
  };

  const dropDownMenus = isOpen ? (
    <div aria-expanded="true">{buildMenu()}</div>
  ) : null;

  return <div className="container">{dropDownMenus}</div>;
}

export default DropDownJS;
