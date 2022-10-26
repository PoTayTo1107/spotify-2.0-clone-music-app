import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';

import { logo } from '../assets';
import { links } from '../assets/constants';
import { subscribe, preferences } from '../redux/features/themeSlice';

const style =
    'flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 dark:hover:text-cyan-400 hover:text-[#a4fcbe]';

const NavLinks = ({ handleClick, inactive, setInactive }) => (
    <div className="mt-10">
        {links.map((item) => (
            <NavLink
                onClick={() => {
                    if (handleClick) handleClick();
                    if (item.to !== '/') setInactive(true);
                    else setInactive(false);
                }}
                className={({ isActive }) =>
                    `${style} ${isActive ? 'dark:text-cyan-400 text-[#a4fcbe]' : ''} ${
                        item.name === 'Discover' ? `${inactive ? 'inact' : ''}` : ''
                    }`
                }
                key={item.name}
                to={item.to}>
                <item.icon className="w-6 h-6 mr-2" />
                {item.name}
            </NavLink>
        ))}
    </div>
);

const Sidebar = ({ inactive, setInactive }) => {
    const dispatch = useDispatch();
    const darkThemeEnabled = useSelector((state) => state.theme.value);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkThemeEnabled);
    }, [darkThemeEnabled]);

    const handleClick = () => {
        dispatch(preferences());
        dispatch(subscribe());
    };

    return (
        <>
            <div
                className={`md:flex hidden flex-col w-[240px] py-10 px-4 ${
                    darkThemeEnabled ? 'bg-[#191624]' : 'bg-[#433b66]'
                }`}>
                <img src={logo} alt="logo" className="w-full h-14 object-contain" />
                <NavLinks inactive={inactive} setInactive={setInactive} />
                <p>
                    <input type="checkbox" checked={darkThemeEnabled} onChange={handleClick} />
                    <span className="text-[#a4fcbe] dark:text-cyan-400">Use Dark Theme</span>
                </p>
            </div>

            <div className="absolute md:hidden block top-6 right-3">
                {mobileMenuOpen ? (
                    <RiCloseLine
                        className="w-6 h-6 text-[#a4fcbe] dark:text-white mr-2"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                ) : (
                    <HiOutlineMenu
                        className="w-6 h-6 text-[#a4fcbe] dark:text-white mr-2"
                        onClick={() => setMobileMenuOpen(true)}
                    />
                )}
            </div>

            <div
                className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition 
                            ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
                <img src={logo} alt="logo" className="w-full h-14 object-contain" />
                <NavLinks handleClick={() => setMobileMenuOpen(false)} />
            </div>
        </>
    );
};

export default Sidebar;
