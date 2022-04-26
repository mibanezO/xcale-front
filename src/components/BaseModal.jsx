import React from "react";

function BaseModal({ open, disableBackground, onClose, children }) {
  let classList = ["modal"];
  if (open) classList.push("is-active");
  const handleBgClick = () => {
    if (disableBackground) return;
    onClose();
  };
  return (
    <div className={classList.join(" ")} >
      <div onClick={handleBgClick} className="modal-background"></div>
      {children}
    </div>
  );
}

export default BaseModal;
