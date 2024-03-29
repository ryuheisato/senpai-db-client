import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Profile() {
  const router = useRouter();
  const { userId } = router.query;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/user');
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await res.json();
        setData(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const user = data.find(user => user.ID === parseInt(userId));

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="p-20">
      <Card>
        <CardHeader>
          <CardTitle><h1 className="text-4xl md:text-5xl">{user.Name}</h1></CardTitle>
        </CardHeader>
        <CardContent>
          <p className="flex text-2xl md:text-3xl py-5 pl-10">就職先：<span>{user.Company}</span></p>
          <p className="flex text-2xl md:text-3xl py-5 pl-10">専攻：<span>{user.Major}</span></p>
          <p className="flex text-2xl md:text-3xl py-5 pl-10">連絡先：<span>{user.Email}</span></p>
        </CardContent>
      </Card>
    </div>
    </div>

  );
}
