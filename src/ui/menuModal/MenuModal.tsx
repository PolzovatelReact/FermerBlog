import React, { useEffect } from "react";
import menumodal from "./menumodal.module.css";

interface DropDownProps {
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
}
const MenuModal: React.FC<DropDownProps> = ({
  active,
  setActive,
  children,
}) => {
  useEffect(() => {
    const handleMenuModalKeyClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };
    if (active) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleMenuModalKeyClose);
    }
    return () => {
      window.removeEventListener("keydown", handleMenuModalKeyClose);
    };
  }, [active, setActive]);
  if (!active) return null;
  return (
    <div
      className={`${menumodal.overlay} ${active ? menumodal.active : ""}`}
      onClick={() => setActive(false)}
    >
      <div
        className={`${menumodal.modalmenu} ${active ? menumodal.active : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={menumodal.modal_content}>{children}</div>
      </div>
    </div>
  );
};
export default MenuModal;
