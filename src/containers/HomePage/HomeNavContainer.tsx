import { useRef } from "react";

import HomeNav from "../../components/Nav/HomeNav";

function HomeNavContainer() {
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const openMobileNav = () => {
    mobileNavRef.current?.classList.add('active');
  }
  
  const closeMobileNav = () => {
    mobileNavRef.current?.classList.remove('active');
  };

  return (
    <HomeNav openMobileNav={openMobileNav} closeMobileNav={closeMobileNav} mobileNavRef={mobileNavRef} />
  )
}

export default HomeNavContainer;