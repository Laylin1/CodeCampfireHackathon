import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from "react-router-dom"
export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="fixed top-4 left-4 z-50 p-2 bg-black rounded-full shadow-lg"
            >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setOpen(false)}
            />

            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-black z-50 shadow-lg transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4 border-b font-semibold text-lg flex justify-center">CodeCampFire</div>
                <ul className="p-4 space-y-2">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/addUser"}>Add user</Link></li>
                </ul>
            </aside>
        </>
    );
}
