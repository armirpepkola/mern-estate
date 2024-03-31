import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/images/RSMarketplace.png';
import { RiMenuUnfoldFill } from "react-icons/ri";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className='bg-teal-500 shadow-md z-30'>
      <div className="navbar max-w-6xl mx-auto p-4">
        <div className="navbar-start">
          <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="btn btn-ghost drawer-button text-white">
                <RiMenuUnfoldFill style={{ fontSize: '24px' }} />
              </label>
            </div> 
            <div className="drawer-side">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li className='text-black transition duration-300 hover:text-slate-900'>
                  <Link to='/search'>Properties</Link>
                </li>
                <li className='text-black transition duration-300 hover:text-slate-900'>
                  <Link to='/about'>About</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar-center">
          <Link to='/'>
            <img src={logo} alt='logo' className='w-56' />
          </Link>
        </div>
        <div className="navbar-end">
          <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-8 w-8 object-cover transition duration-300 hover:opacity-80'
                  src={currentUser.avatar}
                  alt='profile'
                />
              ) : (
                <button className='btn glass text-white hover:text-slate-900 transition duration-300'>
                  Sign in
                </button>
              )}
          </Link>
        </div>
      </div>
    </header>
  );
}