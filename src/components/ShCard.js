import React from 'react';
import { Link } from 'react-router-dom';

export default function ShCardCard({ data }) {
    // Check if data.channelInfo exists and contains the image property
    const channelImage = data.channelInfo && data.channelInfo.image;

    return (
        <div className='flex rounded-lg overflow-hidden shadow-lg bg-zinc-800 text-white mb-5 hover:shadow-xl'>
            {/* Left side: Thumbnail */}
            <Link to = {`/watch/${data.videoId}`}>
            <img src={data.videoThumbnail} alt="" className='w-full h-auto object-cover'/>
            </Link>
            {/* Right side: Title, Duration, Views, Video Age, Description */}
            <div className='flex flex-col justify-between w-2/3 p-4'>
                {/* Top: Title, Duration */}
                <div>
                    <h3 className='text-lg font-semibold mb-2'><a href='#' className='hover:text-blue-500'>{data.videoTitle}</a></h3>
                    <span className='text-sm bg-zinc-800 bg-opacity-75 px-2 py-0.5 rounded mr-2'>
                        {data.videoDuration}
                    </span>
                </div>
                {/* Middle: Channel Image, Views, Video Age */}
                <div className='flex items-center mt-2'>
                    {channelImage && (
                        <a href='#' className='mr-2'><img src={channelImage} alt='Channel Image' className='h-8 w-8 rounded-full' /></a>
                    )}
                    {data.channelInfo && (
                        <a href='#' className='hover:text-blue-400'>{data.channelInfo.name}</a>
                    )}
                    <span className='mx-2'>&bull;</span>
                    <span>{data.videoViews} views</span>
                    <span className='mx-2'>&bull;</span>
                    <span>{data.videoAge}</span>
                </div>
                {/* Bottom: Description */}
                <p className='mt-2 text-sm text-gray-400'>{data.videoDescription}</p>
            </div>
        </div>
    );
}
