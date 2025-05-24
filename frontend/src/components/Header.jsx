import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function Header() {
    const [categorydropdown, setCategorydropdown] = useState(false);
    const theme = useTheme();
    const categories = ["business", "entertainment", "general", "science", "technology", "health", "sports"];
    const navRef = useRef();

    useEffect(() => {
        document.body.className = theme.palette.mode === 'dark' ? 'dark-theme' : 'light-theme';
    }, [theme.palette.mode]);

    useEffect(() => {
        const link1 = document.createElement('link');
        link1.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@900;700;500&display=swap';
        link1.rel = 'stylesheet';
        document.head.appendChild(link1);
        return () => { document.head.removeChild(link1); };
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setCategorydropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function toggleTheme() {
        theme.palette.mode = theme.palette.mode === 'dark' ? 'light' : 'dark';
    }

    return (
        <header>
            <nav className="w-full bg-[#204020] border-b-2 border-gray-300 shadow-md" style={{ minHeight: '110px' }} ref={navRef}>
                <div className="container mx-auto flex items-center justify-between py-4 px-4" style={{ minHeight: '70px' }}>
                    <div className="w-[200px]"></div>
                    <div className="flex flex-col items-center justify-center text-center mx-auto" style={{ zIndex: 1 }}>
                        <div className="flex flex-row items-center justify-center">
                            <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: '2.3rem', color: 'white', fontWeight: 700, letterSpacing: '2px', lineHeight: 1, display: 'inline-block', marginRight: '2px' }}>
                                News
                            </span>
                            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '2.3rem', color: 'white', letterSpacing: '1px', display: 'inline-block', marginLeft: '2px' }}>
                                Nexus
                            </span>
                        </div>
                        <span className="text-[#e6e6cc] text-base font-light tracking-wide mt-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '1.05rem' }}>Curated. Connected. Current.</span>
                    </div>
                    <div className="w-[200px]"></div>
                </div>
            </nav>
        </header>
    );
}

export default Header;