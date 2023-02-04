import { useContext } from 'react';
import { AuthContext } from '../authContext';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/admin/login');
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <nav className="w-[1216px] h-[96px] flex justify-between items-center  ">
      <span className="text-white text-5xl font-bold leading-5">App</span>
      <button
        onClick={() => handleLogout()}
        className="bg-[#9BFF00] py-3 hover:bg-opacity-80 duration-300 px-6 rounded-[40px] text-[#050505] text-base leading-5 flex items-center space-x-1"
      >
        <BiUser className="text-[#696969] text-xl" /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
