import { useEffect, useState } from 'react';

export default function AlmuniListPage() {
  const [data, setData] = useState([]);

  //モックデータを取得
  const fetchData = async () => {
    const res = await fetch('http://localhost:3001/user');
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className='mt-4'>Senpai</h1>
      <p>先輩リストページ-Shohei</p>
      {data.map((user: any) => (
        //モックデータを表示
        <tr key={user.ID}>
          <td>{user.ID}</td>
          <td>{user.Name}</td>
          <td>{user.Email}</td>
          <td>{user.Company}</td>
        </tr>
      ))}
    </div>
  );
}
