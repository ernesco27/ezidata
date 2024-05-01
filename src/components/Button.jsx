import React from "react";
import style from "../styles/Button.module.css";

function Button({ title, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
      >
        {title}
      </button>
    </div>
  );
}

export { Button };
