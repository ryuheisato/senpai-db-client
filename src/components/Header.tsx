import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  const isSpecifiedRoute = (): boolean => {
    const specifiedRoutes = ['/', '/login', '/signup'];
    return specifiedRoutes.includes(router.pathname);
  };

  return (
    <header className='text-gray-900 font-bold border-b-2 border-b-slate-500'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link
          href='/'
          className='flex title-font font-medium items-center text-gray-600 mb-4 md:mb-0'
        >
          <span className='ml-4 font-bold text-2xl italic'>
            先輩データベース
          </span>
        </Link>
        {!isSpecifiedRoute() && (
          <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
            <button
              className='mr-8 hover:text-gray-600'
              onClick={() => router.push('/alumni')}
            >
              先輩リスト
            </button>
            <button
              onClick={() => router.push('/posts')}
              className='mr-8 hover:text-gray-600'
            >
              お悩み板
            </button>
            <button
              onClick={() => router.push('/mypage')}
              className='mr-16 hover:text-gray-600'
            >
              マイページ
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
