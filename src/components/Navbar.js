import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsBell } from 'react-icons/bs';
import { FaMicrophone } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoLogoYoutube } from 'react-icons/io';
import { RiVideoAddLine } from 'react-icons/ri';


export default function Navbar() {
    return (
        <div className='flex justify-between px-14 h-14 items-center bg-[#222] opacity-95 sticky text-white'>
            <div className='flex gap-8 items-center text-2xl '>
                <div className=''>
                    <GiHamburgerMenu />
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <IoLogoYoutube className='text-3 xl text-red-600' />
                    <span className='text-2xl'>Youtube</span>
                </div>
            </div>
            <div className='flex items-center justify-center gap-5'>
                <form >
                    <div className='flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-2xl'>
                        <div className='flex gap-5 items-center pr-5'>
                            <input type="text" placeholder='Search' className='w-96 bg-zinc-900 focus:outline-none border-none ' />
                        </div>
                        <button className='h-10 w-16 flex items-center justify-center bg-[#111] rounded-r-2xl'>
                            < AiOutlineSearch className=' text-xl' />
                        </button>
                    </div>
                </form>
                <div className='text-xl p-3 bg-[#111] rounded-full hover:bg-zinc-600'>
                    <FaMicrophone />
                </div>
            </div>
            <div className=' flex items-center justify-between gap-7'>
                <RiVideoAddLine />
                <div className='relative'>
                    <BsBell />
                    <span className='absolute bottom-2 left-3 text-xs bg-red-600 rounded-full px-1'>9+</span>
                </div>
                <img src="https://w7.pngwing.com/pngs/644/197/png-transparent-deadpool-logo-deadpool-logo-emblem-marvel-comics-deadpool-angle-face-film-thumbnail.png" alt="profile-logo"
                    className='w-9 h-9 rounded-full' />
            </div>
        </div>
    )
}
