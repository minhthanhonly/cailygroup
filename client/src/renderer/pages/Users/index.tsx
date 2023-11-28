import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { response } from 'express';

// export type Data = {
//   realname: string;
//   user_groupname: string;
//   user_email: string;
//   user_skype: string;
//   user_mobile: string;
// };

export const Users = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = 'http://localhost:8081/user';
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <div>
      <Button href="/add">Thêm Mới</Button>
      <div className="table-container">
        <table className="table table__custom">
          <thead>
            <tr>
              <th>Họ Và Tên</th>
              <th>Nhóm</th>
              <th>Email</th>
              <th>Skype ID</th>
              <th>Phone</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, key) => (
              <tr key={key}>
                <td>{value.realname}</td>
                <td>{value.user_groupname}</td>
                <td>{value.user_email}</td>
                <td>{value.user_skype}</td>
                <td>{value.user_mobile}</td>
                <td>
                  <a href="/edit">
                    <FontAwesomeIcon icon={faPen} />
                  </a>
                  <a>
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
