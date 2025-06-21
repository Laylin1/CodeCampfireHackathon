import { Menu, X, ArrowBigLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const exit = () => {
        localStorage.removeItem("user_id");
        navigate("/");
        location.reload();
    }
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="fixed top-5 left-4 z-60 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-all"

            >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setOpen(false)}
            />


            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
            
                <div className="p-6 border-b border-gray-200 flex items-center justify-center">
                    <h1 className="text-2xl font-bold tracking-wider text-indigo-600 ml-10">CodeCampFire</h1>
                </div>

            
                <ul className="p-6 space-y-4 text-gray-800 font-medium">
                    <li>
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-lg hover:bg-indigo-100 transition"
                            onClick={() => setOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-lg hover:bg-indigo-100 transition"
                            onClick={() => setOpen(false)}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-lg hover:bg-indigo-100 transition"
                            onClick={() => setOpen(false)}
                        >
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-lg hover:bg-indigo-100 transition"
                            onClick={() => setOpen(false)}
                        >
                            Best Geeks
                        </Link>
                    </li>
                </ul>
                <button onClick={exit} className="absolute bottom-3.5 left-2.5 px-6 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300">
                    Exit
                </button>

            </aside>
        </>
    );
}