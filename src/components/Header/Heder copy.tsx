import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import menuButton from "./menuButton.module.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice/authSlice";
import ProfileMenu from "../../ui/profileMenu/ProfileMenu";
import PeopleSVG from "./SVG/PeopleSVG";
import BlogSVG from "./SVG/BlogSVG";
import EventsSVG from "./SVG/EventsSVG";
import MessagesSVG from "./SVG/MessagesSVG";
import themes from "../../ui/ThemeToggle/theme.module.css";
import { toggleTheme } from "../../store/themeSlice/themeSlice";
import { RootState } from "../../store";
import topmenu from "./topmenu.module.css";
import "../../index.css";
import BellSVG from "./SVG/BellSVG";
import SquareSVG from "./SVG/SquareSVG";

const Header: React.FC = () => {
  const [theme] = useState<"light" | "dark">("light");
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
  const styleTheme = useSelector((state: RootState) => state.theme.theme);

  //состояние темы

  const dispatch = useDispatch(); //Выход из профиля

  const handleLogout = () => {
    dispatch(logout());
  }; // Выход из профиля

  // ${
  //         theme === "light" ? themes.lightBlock : themes.darkBlock
  //       }
  return (
    <>
      <div className={`${topmenu.top_menu} navTop ${theme}`}>
        <div className={`${topmenu.top_menu_top_menu_block}`}>
          <div className={` ${topmenu.top_menu_top_menu_block_logo} `}>
            <img src="images/logo.svg" alt="logo" />
          </div>
          <div className={`${topmenu.top_menu_menu}`}>
            <ul className={`${topmenu.top_menu_menu_ul}`}>
              <li
                className={`${topmenu.top_menu_menu_ul_users} ${topmenu.top_menu_menu_ul_users_after}`}
              >
                <NavLink to="/people"> Люди</NavLink>
                <a href="/people">
                  <span
                    className={`${topmenu.top_menu_menu_right_menu_right_ul_link_img}`}
                  >
                    <PeopleSVG />
                  </span>
                  <span className={`${topmenu.link_text}`}>Люди</span>
                </a>
              </li>
              <li
                className={`${topmenu.top_menu_menu_ul_users} ${topmenu.top_menu_menu_ul_users_after}`}
              >
                <a href="/bloglist">
                  <span
                    className={`${topmenu.top_menu_menu_right_menu_right_ul_link_img}`}
                  >
                    <BlogSVG />
                  </span>
                  <span className={`${topmenu.link_text}`}>Блог</span>
                </a>
              </li>
              <li
                className={`${topmenu.top_menu_menu_ul_users} ${topmenu.top_menu_menu_ul_users_after}`}
              >
                <a href="/events">
                  <span className={`${topmenu.link_img}`}>
                    <MessagesSVG />
                  </span>
                  <span className={`${topmenu.link_text}`}>События</span>
                </a>
              </li>
              <li className={`${topmenu.top_menu_menu_ul_users}`}>
                <a href="/chats">
                  <span className={`${topmenu.link_img}`}>
                    <MessagesSVG />
                  </span>
                  <span className={`${topmenu.link_text}`}>Сообщения</span>
                </a>
              </li>
            </ul>
          </div>
          <div className={`${topmenu.top_menu_menu_menu_right}`}>
            <ul className={`${topmenu.top_menu_menu_right_menu_right_ul}`}>
              <li
                className={`${topmenu.top_menu_menu_right_menu_right_li} ${topmenu.top_menu_menu_right_menu_right_li_after} ${topmenu.top_menu_menu_right_active_status}`}
              >
                <span className={`${topmenu.link_img}`}>
                  <button>
                    <BellSVG />
                  </button>
                </span>
              </li>
              <li
                className={`${topmenu.top_menu_menu_right_menu_right_li} ${topmenu.top_menu_menu_right_menu_right_li_after} `}
              >
                <span className={`${topmenu.link_img}`}>
                  <button>
                    <SquareSVG />
                  </button>
                </span>
              </li>
              <li
                className={`${topmenu.top_menu_menu_right_menu_right_li}  ${topmenu.top_menu_menu_right_menu_right_ul_menu_right_li_arrow}`}
              >
                <span className={`${topmenu.link_photo}`}>
                  <img src="images/profile_pic_min.png" />
                </span>
                <span className={`${styles.link_img} ${styles.link_img_arrow}`}>
                  <button
                    className={styles.buttonS}
                    onClick={() => setIsOpenProfileMenu((prev) => !prev)}
                  >
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform: isOpenProfileMenu
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <path
                        d="M7.07102 5.31388L12.021 0.363882C12.1133 0.268372 12.2236 0.19219 12.3456 0.139781C12.4676 0.0873716 12.5988 0.0597853 12.7316 0.0586315C12.8644 0.0574777 12.9961 0.0827794 13.119 0.13306C13.2419 0.183341 13.3535 0.257594 13.4474 0.351487C13.5413 0.44538 13.6156 0.557032 13.6658 0.679928C13.7161 0.802824 13.7414 0.934504 13.7403 1.06728C13.7391 1.20006 13.7115 1.33128 13.6591 1.45329C13.6067 1.57529 13.5305 1.68564 13.435 1.77788L7.77802 7.43488C7.59049 7.62235 7.33619 7.72767 7.07102 7.72767C6.80586 7.72767 6.55155 7.62235 6.36402 7.43488L0.707022 1.77788C0.611511 1.68564 0.535329 1.57529 0.48292 1.45329C0.430511 1.33128 0.402925 1.20006 0.401771 1.06728C0.400617 0.934504 0.425919 0.802824 0.4762 0.679928C0.526481 0.557032 0.600734 0.44538 0.694627 0.351487C0.788519 0.257594 0.900171 0.183341 1.02307 0.13306C1.14596 0.0827794 1.27764 0.0574777 1.41042 0.0586315C1.5432 0.0597853 1.67442 0.0873716 1.79643 0.139781C1.91843 0.19219 2.02877 0.268372 2.12102 0.363882L7.07102 5.31388Z"
                        fill="#2C2C2E"
                      />
                    </svg>
                  </button>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ProfileMenu isOpen={isOpenProfileMenu} setIsOpen={setIsOpenProfileMenu}>
        <nav className={`${themes.block}`}>
          <button onClick={() => dispatch(toggleTheme())}>
            {styleTheme === "light" ? "🌙 Ночная тема" : "☀️ Светлая тема"}
          </button>
          <ul className={menuButton.menuButton_list}>
            <Link to="/profile">
              <li className={menuButton.menuButton_item}>Настройка профиля</li>
            </Link>

            <li className={menuButton.menuButton_item} onClick={handleLogout}>
              Выход
            </li>
          </ul>
        </nav>
      </ProfileMenu>
    </>
  );
};
export default Header;
