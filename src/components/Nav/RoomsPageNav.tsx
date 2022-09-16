import styled from "styled-components";

import { ReactComponent as HamburgerIcon } from '../../assets/modals/hamburgerIcon.svg';
import RoomsPageToggleNav from "./RoomsPageToggleNav";

interface RoomsPageNavProps {
  isOpen: boolean;
  toggleInnerNav: any;
}

function RoomsPageNav({ isOpen, toggleInnerNav }: RoomsPageNavProps) {

  return (
    <div className="header">
      <HeaderNavButtonWrapper>
        <HamburgerIcon
          fill="#030000"
          width="32px"
          height="32px"
          className="sidebar"
          // onClick={() => openSidebar(true)}
        />
      </HeaderNavButtonWrapper>
      <RoomsPageToggleNav
        isOpen={isOpen}
        toggleInnerNav={toggleInnerNav}
        // setIsM={setIsM}
        // setIsSignup={setIsSignup}
      ></RoomsPageToggleNav>
      {/* {LoginM && <LoginModal setIsM={setIsM} setIsSignup={setIsSignup} />}
      {SignupM && <SignupModal setIsSignup={setIsSignup} />} */}
    </div>
  )
}

export default RoomsPageNav;

const HeaderNavButtonWrapper = styled.button`
  margin: 45px 0 0 0;
  border: none;
  background-color: transparent;
  .sidebar{
    position: relative;
  }
`;