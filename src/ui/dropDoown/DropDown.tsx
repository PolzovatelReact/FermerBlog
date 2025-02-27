import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./menuButton.module.css";

interface DropDownProps {
  label: string;
  children: ReactNode;
}

const DropDown: React.FC<DropDownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-button">
        {label}
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};
export default DropDown;
