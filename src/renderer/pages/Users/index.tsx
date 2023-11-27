import { useEffect, useState } from 'react';

export const Users = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8081/user')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="table-container table--04">
      <table className="table table__custom">
        <thead>
          <tr>
            <th>Họ Và Tên</th>
            <th>Nhóm</th>
            <th>Email</th>
            <th>Skype ID</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.realname}</td>
              <td>{d.user_groupname}</td>
              <td>{d.user_email}</td>
              <td>{d.user_skype}</td>
              <td>{d.user_mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
