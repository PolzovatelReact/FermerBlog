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
      <div className={`${styles.blog_left}`}>
        <div className={`${styles.blog_left_menu_left} navTest ${theme}`}>
          <ul className={`${styles.blog_left_menu_left_ul}`}>
            {uniqueCategories.map((type) => (
              <li className={`${styles.blog_left_menu_left_li}`} key={type}>
                <Link
                  className={`${styles.blog_left_menu_left_link}`}
                  to={`/bloglist/${type}`}
                >
                  <span className={`${styles.blog_left_menu_left_li_text}`}>
                    {categoryNames[type] || type}{" "}
                  </span>
                  <span className={`${styles.blog_left_menu_left_li_arrow}`}>
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.09501 5.55874L0.970011 1.43374C0.818212 1.27658 0.734217 1.06607 0.736115 0.847577C0.738014 0.629079 0.825655 0.420069 0.980162 0.265562C1.13467 0.111055 1.34368 0.0234146 1.56218 0.0215159C1.78067 0.0196172 1.99118 0.103613 2.14834 0.255411L6.86251 4.96958C7.01874 5.12585 7.1065 5.33777 7.1065 5.55874C7.1065 5.77971 7.01874 5.99164 6.86251 6.14791L2.14834 10.8621C1.99118 11.0139 1.78067 11.0979 1.56218 11.096C1.34368 11.0941 1.13467 11.0064 0.980162 10.8519C0.825655 10.6974 0.738014 10.4884 0.736115 10.2699C0.734217 10.0514 0.818212 9.84091 0.970011 9.68374L5.09501 5.55874Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
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
