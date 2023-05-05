import React, { useEffect, useState } from "react";

import './ScrollUp.css';

export const ScrollUp = () => {
  const coords = window.innerHeight * 2;
  const [show, changeShow] = useState(false);

  useEffect(
    () => {
      document.addEventListener('scroll', checkScroll);
      return () => {
        document.removeEventListener('scroll', checkScroll);
      };
    },
    [show]
  );

  function checkScroll() {
    let scrolled = window.scrollY;
    if (!show && coords < scrolled) {
      changeShow(true);
    }
    if (show && coords > scrolled) {
      changeShow(false);
    }
  }

  function getScrollClass() {
    let className;
    if (show) {
      className = "scroll-up show";
    } else {
      className = "scroll-up";
    }
    return className;
  }

  function scrollPage() {
    let scrolled = window.scrollY;
    window.scrollBy(0, -scrolled);
  }

  return (
    <div className={getScrollClass()} onClick={scrollPage}>
      <span className="material-icons-outlined">expand_less</span>
    </div>
  );
}