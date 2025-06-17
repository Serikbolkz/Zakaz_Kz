import React, { useEffect } from 'react';
import './LogoScroller.css';

const LogoScroller = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(clone);
        });
      });
    }
  }, []);

  return (
    <div className="scroller" data-direction="left" data-speed="slow">
      <div className="scroller__inner">
        <img src="/logos/altynfood.jpg" alt="Altyn Food" />
        <img src="/logos/arbuzkz.jpg" alt="Arbuz.kz" />
        <img src="/logos/galmart.jpg" alt="Galmart" />
        <img src="/logos/magnum.png" alt="Magnum" />
        <img src="/logos/small.png" alt="Small Market" />
      </div>
    </div>
  );
};

export default LogoScroller;
