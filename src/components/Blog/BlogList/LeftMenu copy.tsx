import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import "../../../index.css";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

interface SidebarProps {
  uniqueCategories: string[];
  categoryNames: { [key: string]: string };
}

const LeftMenu: React.FC<SidebarProps> = ({
  uniqueCategories,
  categoryNames,
}) => {
  const theme = useSelector((state: RootState) => state.theme.theme); //переключение темы

  return (
    <>
      <div className={`${styles.blog_left} navLeft ${theme}`}>
        <div className={`${styles.blog_left_menu_left}`}>
          <ul className={` ${styles.blog_left_menu_left_ul}navTest ${theme}`}>
            124
            {uniqueCategories.map((type) => (
              <li key={type}>
                <Link to={`/bloglist/${type}`}>
                  <span>{categoryNames[type] || type}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
