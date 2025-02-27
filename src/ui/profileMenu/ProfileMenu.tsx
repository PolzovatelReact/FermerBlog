import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice/themeSlice";
import { RootState } from "../../store";
import menuButton from "./menuButton.module.css";
import "../../index.css";

interface ProfileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isOpen,
  setIsOpen,
  children,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleTheme()); // смена темы
  }, [dispatch]);

  useEffect(() => {
    const handleKeyClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyClose);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyClose);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={menuRef}>
      <nav
        className={`${menuButton.menuButton} ${
          isOpen ? menuButton.active : ""
        } navTest ${theme} `}
      >
        {children}
      </nav>
    </div>
  );
};

export default ProfileMenu;
