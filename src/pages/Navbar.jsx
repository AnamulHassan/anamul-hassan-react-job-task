import { useContext } from 'react';
import { AuthContext } from '../authContext';

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <nav className="w-[1216px] h-[96px] flex justify-between items-center  ">
      <span className="text-white text-5xl font-bold leading-5">App</span>
      <button
        onClick={() => dispatch({ type: 'LOGOUT' })}
        className="bg-[#9BFF00] py-3 px-6 rounded-[40px] text-[#050505] text-base leading-5"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
