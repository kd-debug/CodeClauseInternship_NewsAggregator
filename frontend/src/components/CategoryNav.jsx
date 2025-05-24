import React from "react";
import { Link } from 'react-router-dom';

function CategoryNav() {
    const categories = ["business", "entertainment", "general", "science", "technology", "health", "sports"];

    return (
        <div className="container mx-auto flex items-center justify-around py-3 px-4">
            <nav className="w-full">
                <ul className="flex justify-around">
                    {categories.map((cat, idx) => (
                        <li key={idx}>
                            <Link to={`/top-headlines/${cat}`} className="text-[#333300] hover:text-[#556b2f] font-semibold text-lg relative group">
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#556b2f] transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default CategoryNav;