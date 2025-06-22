import React from 'react'

export default function Container({ children }) {
    return (
        <div className='h-full w-3/4 mx-auto'>
            {children}
        </div>
    )
}
