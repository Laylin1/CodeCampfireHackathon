import React from 'react'
import MainPageHeader from '../MainPageHeader/MainPageHeader'
import Container from '../Container'
import photo1 from '../../assets/Photos/photo2.png';
import cl from "./MainPage.module.css"
import { Link } from 'react-router-dom';
export default function MainPage() {
    return (
        <div className='h-screen overflow-hidden'>
            <MainPageHeader></MainPageHeader>
            <div className='mt-20 h-full'>
                <Container>
                    <div className='w-full'>
                        <div style={{ height: "600px" }} className='flex items-center'>
                            <div className='w-1/2 h-2/3'><p className={cl.mainText}>We can help you grow in your career by offering real tasks from big companies.</p></div>
                            <div className={`w-1/2 h-full bg-cover bg-center flex items-end justify-center animate-pulse ${cl.pulseBackground}`} style={{ backgroundImage: `url(${photo1})` }}>
                                <button className="mb-28 text-3xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all">
                                   <Link to={'/register'}>Get started</Link>
                                </button></div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}
