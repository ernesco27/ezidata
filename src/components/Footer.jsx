import React, { useEffect, useState } from "react";
import style from "../styles/Footer.module.css";

function Footer() {
  const [dateInfo, setDateInfo] = useState(0);

  useEffect(() => {
    const date = new Date().getFullYear();

    setDateInfo(date);
  });

  return (
    <footer className={style.footer}>
      <ul className={style.links}>
        <li>Home</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>

      <p>&copy; {dateInfo} Ezidata. All rights reserved.</p>
    </footer>
  );
}

export { Footer };
