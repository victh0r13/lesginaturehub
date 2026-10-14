"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    let frame = 0;

    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < line) {
          el.classList.add("is-visible");
          return false;
        }
        return true;
      });
      if (pending.length === 0) detach();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const detach = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    check();

    return () => {
      detach();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
