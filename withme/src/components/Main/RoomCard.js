import React from 'react';
import styled from 'styled-components';

//icon
import { ReactComponent as LockIcon } from '../../assets/main/lockIcon.svg';
import { ReactComponent as UserNickIcon } from '../../assets/main/userNickIcon.svg';

const RoomCard = (props) => {
  const category = props.category.name;
  return (
    <div>
        <Container>
          <div className='roomcardcontainer'>
            <div className='flexTop'>
              <div>
                {props.isSecret === true ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {category === '뷰티' ? (
                      <CategoryText
                        style={{
                          backgroundColor: '#FCEDB7',
                          marginRight: '8px',
                        }}
                      >
                        {props.category.name}
                      </CategoryText>
                    ) : category === '운동' ? (
                      <CategoryText
                        style={{
                          backgroundColor: '#FFC9C9',
                          marginRight: '8px',
                        }}
                      >
                        {props.category.name}
                      </CategoryText>
                    ) : category === '스터디' ? (
                      <CategoryText
                        style={{
                          backgroundColor: '#B9E8B5',
                          marginRight: '8px',
                        }}
                      >
                        {props.category.name}
                      </CategoryText>
                    ) : category === '상담' ? (
                      <CategoryText
                        style={{
                          backgroundColor: '#FFD9B6',
                          marginRight: '8px',
                        }}
                      >
                        {props.category.name}
                      </CategoryText>
                    ) : category === '문화' ? (
                      <CategoryText
                        style={{
                          backgroundColor: '#B5E3F8',
                          marginRight: '8px',
                        }}
                      >
                        {props.category.name}
                      </CategoryText>
                    ) : category === '기타' ? (
                      <CategoryText
                        style={{
                          backgroundColor: '#B7CEFC',
                          marginRight: '8px',
                        }}
                      >
                        {props.category.name}
                      </CategoryText>
                    ) : null}
                    <div>
                      <LockIcon width="20" fill="#000" />
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
                      <CategoryText style={{ backgroundColor: '#FFD9B6' }}>
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
              <div className="icons">
              <div style={{ display: 'flex', alignItems: 'center', marginTop:"8px" }}>
                <UserNickIcon
                  width="19"
                  fill="#8A8BA3"
                  style={{ marginRight: '4px' }}
                />
                <div>{props.participantCnt}/4</div>
              </div>
            </div>

            </div>
            <TitleText className="title">{props.title}</TitleText>
            <div className="tag">
              {props.Tags.map((r) => {
                return (
                  <span key={r.id}>
                    <TagText># {r.name}</TagText>
                  </span>
                );
              })}
            </div>
          </div>
        </Container>
    </div>
  );
};
const Container = styled.div`
  width: 255px;
  height: 154px;
  border: none;
  padding: 18px;
  border-radius: 4px;
  background-color: #F7F7F7;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
  .roomcardcontainer{
    display: flex;
    flex-direction: column;

    .flexTop {
      display: flex;
      justify-content:space-between;
      margin-bottom: 10px;
    }

    .tag {
    grid-column: 1/ 4;
    white-space: normal;
    margin-top: 5px;
  }
  }
`;

const CategoryText = styled.div`
  background: #ffc9c9;
  border-radius: 4px;
  width: 45px;
  height: 19px;
  margin: 8px 0px;
  padding: 2px 2px;
  font-style: normal;
  font-weight: 700;
  font-size: 0.7rem;
  color: #33344b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.div`
  height: 30px;
  font-weight: 700;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  color: #33344b;
`;

const TagText = styled.span`
  /* background-color: #fafaff; */
  background-color: rgba(227, 229, 255, 0.7);
  color: #4c4d60;
  font-weight: 600;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 6px;
  display: inline-block;
  padding: 4px 10px;
`;

export default RoomCard;
