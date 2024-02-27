import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AlumniListPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [major, setMajor] = useState('');
  const [industry, setIndustry] = useState('');
  const [majors, setMajors] = useState([]);
  const [industries, setIndustries] = useState([]);

  // Fetch data
  const fetchData = async () => {
    const res = await fetch('http://localhost:3001/user');
    const fetchedData = await res.json();
    setData(fetchedData);

    // Extract and set unique majors and industries
    const extractedMajors = [...new Set(fetchedData.map(item => item.Major))];
    const extractedIndustries = [...new Set(fetchedData.map(item => item.Industry))];
    setMajors(extractedMajors);
    setIndustries(extractedIndustries);
    setFilteredData(fetchedData); // Initialize filteredData with all data
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on selected major and industry
    const applyFilters = () => {
      let result = data;
      if (major) {
        result = result.filter(item => item.Major === major);
      }
      if (industry) {
        result = result.filter(item => item.Industry === industry);
      }
      setFilteredData(result);
    };

    applyFilters();
  }, [major, industry, data]);

  return (
    <div>
      <div className="flex justify-between mx-auto container my-10 mx-5">
        <h1>先輩リストページ</h1>
        {/* Filter selection */}
        <div className="mb-4">
          <select className="mr-2" value={major} onChange={(e) => setMajor(e.target.value)}>
            <option value="">専攻を選択</option>
            {majors.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option value="">業界を選択</option>
            {industries.map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <Button className="bg-blue-500" onClick={() => window.location.href='alumni/post'}>投稿する</Button>
      </div>

      <div className="mx-20">

        {/* Table */}
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
            {filteredData.map((user) => (
              <TableRow key={user.ID}>
                <TableCell>{user.Name}</TableCell>
                <TableCell>{user.Major}</TableCell>
                <TableCell>{user.Company}</TableCell>
                <TableCell>{user.Industry}</TableCell>
                <TableCell>{user.Contact}</TableCell> {/* Assuming your user object has a Contact field */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>  
    </div>
  );
}
