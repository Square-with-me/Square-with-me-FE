import Logo from "../etc/Logo";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

interface HomeNavProps {
  openMobileNav: React.MouseEventHandler<HTMLDivElement>;
  closeMobileNav: React.MouseEventHandler<HTMLDivElement>;
  mobileNavRef: React.MutableRefObject<HTMLDivElement | null>;
}

function HomeNav({ openMobileNav, closeMobileNav, mobileNavRef }: HomeNavProps) {

  return (
    <header>
      <div className="header-inner">
        <div className="logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="mobile-menu" onClick={openMobileNav}>
          <MenuIcon />
        </div>
        <div className="gnb" ref={mobileNavRef} onClick={closeMobileNav}>
          <div className="cencel">
            <CloseIcon />
          </div>
          <a href="#feature1">서비스 설명</a>
          <a href="#feature2">튜토리얼</a>
          <a href="#feature3">사용후기</a>
          <div
            onClick={() => {
              window.location.replace('/main');
            }}
          >
            시작하기
          </div>
        </div>
      </div>
    </header>
  )
}

export default HomeNav;