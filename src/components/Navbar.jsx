import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import './Navbar.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Show logout confirmation
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, [auth]);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setShowLogoutConfirm(false); // Close confirmation modal
            navigate('/'); // Redirect to home
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const openLogoutConfirm = () => setShowLogoutConfirm(true);
    const closeLogoutConfirm = () => setShowLogoutConfirm(false);

    const scrollToTop = () => scroll.scrollToTop();

    return (
        <nav className="bg-red-500 text-white px-8 lg:px-16 xl:px-24 sticky top-0 m-5 border-2 rounded-xl z-50 shadow-md">
            <div className="Container py-2 flex justify-between items-center">
                <div className="flex items-center cursor-pointer" onClick={scrollToTop}>
                    <div className="wrapper h-11 w-9 text-white">
                        <svg>
                            <text x="50%" y="40%" dy=".35em" textAnchor="middle">
                                Mission NEB
                            </text>
                        </svg>
                    </div>
                </div>

                <button
                    className="lg:hidden text-white z-50"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <span className="text-2xl">&times;</span> : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>

                <div
                    className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 flex flex-col justify-center items-center transform transition-transform duration-300 ${
                        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:static lg:transform-none lg:flex-row lg:h-auto lg:bg-transparent z-40`}
                >
                    <ul className="space-y-4 text-center font-bold text-lg lg:flex lg:space-y-0 lg:space-x-6">
                        <li>
                            <ScrollLink
                                to=" home"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="hover:text-red-600 cursor-pointer"
                                onClick={closeMenu}
                            >
                                Home
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="about"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="hover:text-red-600 cursor-pointer"
                                onClick={closeMenu}
                            >
                                About us
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="services"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="hover:text-red-600 cursor-pointer"
                                onClick={closeMenu}
                            >
                                Services
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="projects"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="hover:text-red-600 cursor-pointer"
                                onClick={closeMenu}
                            >
                                Student Feedback
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="contact"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="hover:text-red-600 cursor-pointer"
                                onClick={closeMenu}
                            >
                                Contact
                            </ScrollLink>
                        </li>
                    </ul>

                    {isLoggedIn ? (
                        <div className="flex flex-col lg:flex-row lg:space-x-4 mt-6 lg:mt-0">
                            <button
                                className="bg-gradient-to-r from-blue-500 to-green-500 ml-4  gap-3 text-white px-6 py-2 rounded-full"
                                onClick={() => navigate('/user')}
                                aria-label="Go to user profile"
                            >
                                User
                            </button>
                            <button
                                className="bg-gradient-to-r from-red-500 to-yellow-500 ml-4 text-white px-6 py-2 rounded-full"
                                onClick={openLogoutConfirm}
                                aria-label="Logout"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row lg:space-x-4">
                            <button
                                className="bg-gradient-to-r from-red-400 to-blue-500 ml-3  text-white px-6 py-2 rounded-full mt-6 lg:mt-0"
                                onClick={() => navigate('/login')}
                                aria-label="Redirect to login"
                            >
                                Login
                            </button>
                            <button
                                className="bg-gradient-to-r from-red-400 to-blue-500 text-white px-6 py-2 rounded-full mt-6 lg:mt-0"
                                onClick={() => navigate('/signup')}
                                aria-label="Redirect to signup"
                            >
                                SignUp
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
                        <p className="mb-6 text-gray-800">Are you sure you want to log out?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="bg-red-500 text-white px-6 py-2 rounded-full"
                                onClick={handleLogout}
                            >
                                Yes, Logout
                            </button>
                            <button
                                className="bg-gray-500 text-white px-6 py-2 rounded-full"
                                onClick={closeLogoutConfirm}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
