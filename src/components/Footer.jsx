import React, { useEffect, useState } from "react";
import style from "../styles/Footer.module.css";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function Footer() {
  const [dateInfo, setDateInfo] = useState(0);

  const navItems = ["Home", "About", "Contact", "Privacy"];

  useEffect(() => {
    const date = new Date().getFullYear();

    setDateInfo(date);
  });

  return (
    <footer className={style.footer}>
      <ul className={style.links}>
        <ListItem sx={{ textAlign: "center" }}>
          {navItems.map((item) => (
            <Link
              key={item}
              to={
                item === "Home"
                  ? "/"
                  : item === "Contact"
                  ? "/contact"
                  : item === "About"
                  ? "/about"
                  : item === "Privacy"
                  ? "/privacy-policy"
                  : null
              }
            >
              <ListItemButton key={item}>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          ))}
        </ListItem>
      </ul>

      <p>&copy; {dateInfo} Ezidata. All rights reserved.</p>
    </footer>
  );
}

export { Footer };
