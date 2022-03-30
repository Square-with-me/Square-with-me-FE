import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  const [users, setUsers] = useState(null);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onClickEnter = () => {
    if(password === process.env.REACT_APP_ADMIN_PASSWORD) {
      return setIsAdmin(true);
    }
    setFailed(true);
  };

  const giveBugBadge = async (e) => {
    const userId = e.target.dataset.id;

    try {
      const res = await axios.post(`/api/admin/user/${userId}/badge/bug`);
      
      if(res.data.isSuccess) { alert(res.data.msg) }
    } catch(error) {
      console.error(error);
      if(error.response.data.msg) {
        alert(error.response.data.msg);
      }
    }


  };

  useEffect(() => {
    if(!isAdmin) { return ; };

    async function loadUsers() {
      try {
        const res = await axios.get("/api/admin/users");
        setUsers(res.data.data.users);
      } catch(error) {
        console.error(error);
      }
    };

    loadUsers();
  }, [isAdmin]);

  return (
    <>
      {isAdmin
      ? <div>
          <div style={{ marginBottom: "6px" }}>어드민이다.</div>
          {users && users.map((user, idx) => (
            <div key={idx} style={{ display: "flex", padding: "8px", marginBottom: "10px", border: "1px solid #000" }}>
              <div>Id: {user.id}</div>
              <div>origin: {user.origin}</div>
              <div style={{ marginRight: "4px" }}>닉네임: {user.nickname}</div>
              <button data-id={user.id} onClick={giveBugBadge}>버그 뱃지 주기</button>
            </div>
          ))}
        </div>
      : <>
          <input value={password} onChange={onChangePassword} />
          <button onClick={onClickEnter}>드가자~</button>
          {failed && <span>비밀번호 틀림 ㅋ</span>}
        </>
      }
    </>
  )
};

export default Admin;