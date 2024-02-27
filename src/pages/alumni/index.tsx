import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
      <div className = "flex justify-between mx-auto container">
      <h1 className='mt-4 my-5 mx-5'>先輩リストページ-Shohei</h1>
      <Button className="bg-blue-500 my-5 mx-5" onClick={() => window.location.href='alumni/post'}>投稿する</Button>
      </div>

      <div className="mx-20">
        <Table>
            <TableCaption>卒業生リスト</TableCaption>
              <TableHeader>
                <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>専攻</TableHead>
                <TableHead>働いている企業</TableHead>
                <TableHead>業界</TableHead>
                <TableHead>連絡先</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {data.map((user: any) => (
              //モックデータを表示
              <TableRow key={user.ID}>
                <TableCell>{user.Name}</TableCell>
                <TableCell>{user.Major}</TableCell>
                <TableCell>{user.Company}</TableCell>
                <TableCell>{user.Industry}</TableCell>
                <TableCell>{user.Email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </div>  
    </div>
  );
}
