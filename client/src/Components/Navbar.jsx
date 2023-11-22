import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa"; import {FaXmark} from 'react-icons/fa6'

const Navbar = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false)

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    const navItems = [
        { path: "/", title: "Start A Search" },
        { path: "/my-job", title: "My Jobs" },
        { path: "salary", title: "Salary Estimate" },
        { path: "/post-job", title: "Post A Job" },
    ]
    return (
        <div className=' bg-slate-50'>
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <nav className='flex justify-between items-center py-6'>
                <a href='/' className='flex items-center gap-2 text-2xl text-black font-semibold'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width="29"
                        height="30"
                        viewBox='0 0 29 30'
                        fill='none'>
                        <circle
                            cx="12.0143"
                            cy="12.5143"
                            r="12.0143"
                            fill='#1B4F53'
                            fillOpacity="0.4"
                        />
                        <circle cx="16.9857" cy="17.4857" r="12.0143" fill='#0E3D8E'/>    
                        </svg>
                    <span>Job Finder</span>
                </a>

                {/* nav items for larger devices */}
                <ul className='hidden md:flex  gap-12'>
                    { navItems.map(({ path, title }) => (
                        <li key={path} className='text-base text-primary font-semibold'>
                        <NavLink
                            to={path}
                            className={({ isActive, isPending }) =>
                            isActive ? "active" : "" 
                            }
                        >
                            {title}
                        </NavLink>
                        </li>
                        ))}
                </ul>

                {/* SignUp and SignIn Button */}
                <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                    <Link to='/login' className='py-2 px-5 rounded-md bg-sky-500 text-white'>Login</Link>
                    <Link to='/sign-up' className='py-2 px-5 rounded-md  bg-sky-700 text-white'>Sign Up</Link>
                </div>

                {/* mobile menu */}
                <div className='md:hidden block'>
                    <button onClick={handleMenuToggler}>
                        {
                            isMenuOpen ? <FaXmark className='w-5 h-5 text-primary'/> : <FaBars className='w-5 h-5 text-primary'/>
                        }
                    </button>
                </div>
            </nav>

            {/* navItems for mobile */}
            <div className={`px-4 bg-gray-800 py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                { navItems.map(({ path, title }) => (
                        <li key={path} className='text-base text-white first:text-white py-1 font-semibold'>
                        <NavLink
                            to={path}
                            className={({ isActive, isPending }) =>
                            isActive ? "active" : "" 
                            }
                        >
                            {title}
                        </NavLink>
                        </li>
                        ))}

                        <li className='text-white py-1 font-semibold'><Link to='/login'>Login</Link></li>
                </ul>
            </div>
        </header>
        </div>
    )
}

export default Navbar