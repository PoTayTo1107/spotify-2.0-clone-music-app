import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { logo } from '../assets';
import { links } from '../assets/constants';
import { subscribe, preferences } from '../redux/features/themeSlice';

const MaterialUISwitch = styled(Switch)(() => ({
    width: 70,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        '&.Mui-checked': {
            color: '#333',
            transform: 'translateX(30px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff'
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#22d3ee'
            }
        }
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#333',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff'
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
        }
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#a4fcbe',
        borderRadius: 20 / 2
    }
}));

const style =
    'flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 dark:hover:text-cyan-400 hover:text-[#a4fcbe]';
const activeStyle =
    'flex flex-row justify-start items-center my-8 text-sm font-medium dark:text-cyan-400 text-[#a4fcbe]';

const NavLinks = ({ handleClick }) => (
    <div className="mt-10">
        {links.map((item) => (
            <NavLink
                onClick={() => handleClick && handleClick()}
                className={({ isActive }) => (isActive ? activeStyle : style)}
                key={item.name}
                to={item.to}>
                <item.icon className="w-6 h-6 mr-2" />
                {item.name}
            </NavLink>
        ))}
    </div>
);

const Sidebar = () => {
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
            <div className="md:flex hidden flex-col w-[240px] py-10 px-4 dark:bg-[#191624] bg-[#433b66]">
                <img src={logo} alt="logo" className="w-full h-14 object-contain" />
                <NavLinks handleClick={handleClick} />
                <FormControlLabel
                    className="justify-center"
                    control={
                        <MaterialUISwitch sx={{ m: 1 }} checked={darkThemeEnabled} onChange={handleClick} />
                    }
                />
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
                <FormControlLabel
                    control={
                        <MaterialUISwitch sx={{ m: 1 }} checked={darkThemeEnabled} onChange={handleClick} />
                    }
                />
            </div>
        </>
    );
};

export default Sidebar;
