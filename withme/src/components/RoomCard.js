import { useEffect } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FiLock, FiUnlock } from 'react-icons/fi';

import styled from 'styled-components';

const RoomCard = (props) => {
  const { title, pwd, likeCnt, isSecret, id, createdAt, category, Tags } =
    props;

  useEffect(() => {
    console.log(title, isSecret, category, Tags);
  }, []);

  return (
    <RoomCardContainer>
      <div>
        <CategoryText>{category.name}</CategoryText>
        <TitleText className="title">{title}</TitleText>
      </div>
      <div>
        {isSecret === 'true' ? (
          <div>
            <div>
              <FiLock />
            </div>
            <div>
              <BsFillPeopleFill style={{ marginRight: '5px' }} />
              <span>3/4</span>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <FiUnlock />
            </div>
            <div>
              <BsFillPeopleFill style={{ marginRight: '5px' }} />
              <span>3/4</span>
            </div>
          </div>
        )}
      </div>
      <div className="tag">
        {Tags.map((r, idx) => {
          return <TagText>#{r.name}</TagText>;
        })}
      </div>
    </RoomCardContainer>
  );
};

const RoomCardContainer = styled.div`
  width: 255px;
  height: 175px;
  border: none;
  padding: 19px;
  border-radius: 4px;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-rows: 2fr;
  grid-gap: 8px;
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
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  padding: 0px 14px;
  margin-right: 10px;
`;

export default RoomCard;
