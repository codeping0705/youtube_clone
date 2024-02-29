import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getRecommendedVideos } from '../store/reducers/getRecommendedVideos';
import { getVideoDetails } from '../store/reducers/getVideoDetails';

export default function Watch() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentPlaying = useAppSelector(
        (state) => state.youtubeApp.currentPlaying
    );

    useEffect(() => {
        if (id) {
            dispatch(getVideoDetails(id));
        } else {
            navigate("/");
        }
    }, [id, navigate, dispatch]);

    useEffect(() => {
        if (currentPlaying && id) {
            dispatch(getRecommendedVideos(id));
        }
    }, [currentPlaying, dispatch, id]);

    return (
        <>
            {currentPlaying && currentPlaying?.videoId === id && (
                <div className='max-h-screen overflow-auto'>
                    <div style={{ height: "7vh" }}>
                        <Navbar />
                    </div>
                    <div className="container mx-auto mt-8 flex flex-wrap">
                        <div className="border border-gray-300 rounded-lg p-4 mb-4" style={{ flex: '0 0 60%', marginLeft:'20px',maxWidth: '57%' , Height: '80%' }}>
                            <div className="aspect-w-16 aspect-h-9 mb-4" style={{ height: '500px' }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                    title="YouTube Video Player"
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{currentPlaying.videoTitle}</h2>
                                <p className="text-gray-600">{currentPlaying.videoDescription}</p>
                            </div>
                        </div>
                        {/* Add next video section */}
                        <div className="border border-gray-300 rounded-lg p-4 mb-4" style={{ flex: '0 0 40%', maxWidth: '25%', marginLeft: '35px', minHeight: '80%'}}>
                            <h3 className="text-xl font-semibold">Next Videos</h3>
                            {/* Render next video items */}
                            {/* Placeholder for next videos */}
                        </div>
                        {/* Add comment section */}
                        <div className="border border-gray-300 rounded-lg p-4 mb-4"  style={{ flex: '0 0 40%', maxWidth: '50%', marginLeft: '20px',maxHeight: '80%'}}>
                            <h3 className="text-xl font-semibold">Comments</h3>
                            <div className="border-t border-gray-300 mt-4 pt-4">
                                {/* Add comment items here */}
                                <div className="mb-4">
                                    <h4 className="text-base font-semibold">Username</h4>
                                    <p className="text-gray-600">Comment content goes here</p>
                                </div>
                                {/* Add more comment items as needed */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
