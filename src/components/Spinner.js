import React from 'react'

export default function Spinner() {
    return (
        <div className='flex items-center w-full justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700 border-t-transparent'>
            </div>
        </div>
    )
}
