import { useState } from "react";
import RoomsPageNav from "../../components/Nav/RoomsPageNav";

function RoomsPageNavContainer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInnerNav = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <>
      <RoomsPageNav isOpen={isOpen} toggleInnerNav={toggleInnerNav} />
    </>
  )
}

export default RoomsPageNavContainer;