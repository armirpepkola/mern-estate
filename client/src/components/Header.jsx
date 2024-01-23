import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className='bg-teal-500 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/'>
          <h1 className='font-bold text-lg sm:text-2xl text-white flex items-center'>
            <span className='text-white'>RS Marketplace</span>
          </h1>
        </Link>

        <ul className='flex gap-4'>
          <li className='text-white transition duration-300 hover:text-slate-200'>
            <Link to='/search'>Properties</Link>
          </li>
          <li className='text-white transition duration-300 hover:text-slate-200'>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-8 w-8 object-cover transition duration-300 hover:opacity-80'
                  src={currentUser.avatar}
                  alt='profile'
                />
              ) : (
                <button className='text-white hover:text-slate-200 transition duration-300'>
                  Sign in
                </button>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}