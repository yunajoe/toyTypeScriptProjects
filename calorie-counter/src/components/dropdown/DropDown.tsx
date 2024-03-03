import { SetStateAction } from "react";
import styles from "./DropDown.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

type DropDownPropsType = {
  menus: string[];
  defaultOption: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  handleMenuClick: (menu: string) => void;
};

function DropDown({ menus, isOpen, handleMenuClick }: DropDownPropsType) {
  const buildMenu = () => {
    return (
      <div className={cx("wrapper")}>
        {menus.map((menu) => {
          return (
            <li key={menu} onClick={() => handleMenuClick(menu)}>
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

export default DropDown;
