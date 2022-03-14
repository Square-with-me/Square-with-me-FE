import { useEffect } from 'react';
import styled from 'styled-components';

//icon
// import { BsFillPeopleFill } from 'react-icons/bs';
// import { FiLock, FiUnlock } from 'react-icons/fi';
// import { ReactComponent as HotRoomIcon } from '../assets/main/hotRoomIcon.svg'
import { ReactComponent as LockIcon } from '../assets/main/lockIcon.svg';
import { ReactComponent as UserNickIcon } from '../assets/main/userNickIcon.svg';

const RoomCard = (props, { possible }) => {
  // useEffect(() => {
  //   console.log(title, isSecret, category, Tags);
  // }, []);
  console.log(possible);
  return (
    <RoomCardContainer>
      <div>
        <div>
          {props.isSecret === true ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CategoryText style={{ marginRight: '8px' }}>
                {props.category.name}
              </CategoryText>
              <div>
                <LockIcon width="20" fill="#8A8BA3" />
              </div>
            </div>
          ) : (
            <CategoryText>{props.category.name}</CategoryText>
          )}
        </div>

        <TitleText className="title">{props.title}</TitleText>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <UserNickIcon width="20" fill="#8A8BA3" />
        </div>
        <div>3/4</div>
      </div>
      <div className="tag">
        {props.Tags.map((r, idx) => {
          return <TagText>#{r.name}</TagText>;
        })}
      </div>
    </RoomCardContainer>
  );
};

const RoomCardContainer = styled.div`
  width: 255px;
  height: 154px;
  border: none;
  padding: 19px;
  border-radius: 4px;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-rows: 2fr;
  grid-gap: 8px;
  padding: 14px;
  .tag {
    grid-column: 1/ 4;
    grid-row: 2 / 3;
    white-space: pre-line;
  }
`;

const CategoryText = styled.div`
  background: #ffc9c9;
  border-radius: 4px;
  width: 45px;
  height: 18px;
  margin: 8px 0px;
  padding: 2px 4px;
  font-style: normal;
  font-weight: 700;
  font-size: 0.6rem;
  color: #33344b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.div`
  font-weight: 700;
  white-space: nowrap;
  display: block;
  font-size: 1.2rem;
  color: #33344b;
`;

const TagText = styled.span`
  background-color: #fafaff;
  color: #33344b;
  font-weight: 400;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  margin-right: 8px;
  height: 24px;
`;

export default RoomCard;
