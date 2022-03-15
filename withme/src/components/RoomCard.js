import React from 'react';
import styled from 'styled-components';

//icon
import { ReactComponent as LockIcon } from '../assets/main/lockIcon.svg';
import { ReactComponent as UserNickIcon } from '../assets/main/userNickIcon.svg';

const RoomCard = (props, { possible }) => {
  console.log(props);
  const category = props.category.name;

  return (
    <Con>
      <RoomCardContainer>
        <div>
          <div>
            {props.isSecret === true ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {category === '뷰티' ? (
                  <CategoryText
                    style={{ backgroundColor: '#FCEDB7', marginRight: '8px' }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === '운동' ? (
                  <CategoryText
                    style={{ backgroundColor: '#FFC9C9', marginRight: '8px' }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === '스터디' ? (
                  <CategoryText
                    style={{ backgroundColor: '#B9E8B5', marginRight: '8px' }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === '상담' ? (
                  <CategoryText
                    style={{ backgroundColor: 'black', marginRight: '8px' }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === '문화' ? (
                  <CategoryText
                    style={{ backgroundColor: '#B5E3F8', marginRight: '8px' }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === '기타' ? (
                  <CategoryText
                    style={{ backgroundColor: '#B7CEFC', marginRight: '8px' }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : null}
                <div>
                  <LockIcon width="20" fill="#8A8BA3" />
                </div>
              </div>
            ) : (
              <div>
                {category === '뷰티' ? (
                  <CategoryText style={{ backgroundColor: '#FCEDB7' }}>
                    {props.category.name}
                  </CategoryText>
                ) : category === '운동' ? (
                  <CategoryText style={{ backgroundColor: '#FFC9C9' }}>
                    {props.category.name}
                  </CategoryText>
                ) : category === '스터디' ? (
                  <CategoryText style={{ backgroundColor: '#B9E8B5' }}>
                    {props.category.name}
                  </CategoryText>
                ) : category === '상담' ? (
                  <CategoryText style={{ backgroundColor: 'black' }}>
                    {props.category.name}
                  </CategoryText>
                ) : category === '문화' ? (
                  <CategoryText style={{ backgroundColor: '#B5E3F8' }}>
                    {props.category.name}
                  </CategoryText>
                ) : category === '기타' ? (
                  <CategoryText style={{ backgroundColor: '#B7CEFC' }}>
                    {props.category.name}
                  </CategoryText>
                ) : null}
              </div>
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
    </Con>
  );
};
const Con = styled.div`
  width: 255px;
  height: 154px;
  border: none;
  padding: 18px;
  border-radius: 4px;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
`;

const RoomCardContainer = styled.div`
  width: 227px;
  height: 126px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-rows: 2fr;
  grid-gap: 8px;
  overflow: auto;
  .tag {
    grid-column: 1/ 4;
    grid-row: 2 / 3;
    /* white-space: pre-line; */
    margin-top: 5px;
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
  width: 171px;
  font-weight: 700;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
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
