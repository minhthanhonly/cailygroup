import { useEffect, useState } from 'react';

export const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8081/user')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h2>Home page</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>GROUP</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.realname}</td>
              <td>{d.user_group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
