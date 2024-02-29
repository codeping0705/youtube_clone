import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ data }) {
    // Check if data.channelInfo exists and contains the image property
    const channelImage = data.channelInfo && data.channelInfo.image;

    return (
        <div className='w-72 h-84 rounded-lg overflow-hidden shadow-lg bg-zinc-800 mb-5 mr-3 text-white hover:shadow-zinc-600/40'>
            <Link to = {`/watch/${data.videoId}`}>
            <img src={data.videoThumbnail} alt="" className='w-full h-44 object-cover'/>
            </Link>
            <div className='px-6 py-4'>
                <div className='relative'>
                    <span className='absolute bottom-6 right-2 text-sm bg-zinc-800 bg-opacity-75 px-2 py-0.5 rounded'>
                        {data.videoDuration}
                    </span>
                </div>
                <div className='p-0 m-0 border-t border-zinc-800'>
                    <h3 className='text-lg font-semibold mt-2'><a href='#' className='hover:text-blue-500'>{data.videoTitle}</a></h3>
                    <div className='flex items-center mt-1 text-sm text-gray-400'>
                        {channelImage && (
                            <a href='#' className='mr-2'><img src={channelImage} alt='Channel Image' className='h-8 w-8 rounded-full' /></a>
                        )}
                        {data.channelInfo && (
                            <a href='#' className='hover:text-blue-400'>{data.channelInfo.name}</a>
                        )}
                        <span className='mx-1'>&bull;</span>
                        <span>{data.videoViews} views</span>
                        <span className='mx-1'>&bull;</span>
                        <span>{data.videoAge}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
