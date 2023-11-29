import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Users = () => {
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
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <a href="/edit">
                    <FontAwesomeIcon icon={faPen} />
                  </a>
                  <a>
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
