import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ShCard from '../components/ShCard';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { clearVideos } from '../features/youtube/youtubeSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);
    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm)

    useEffect(() => {
        dispatch(clearVideos());
        if (searchTerm === "") navigate("/");
        else {
            dispatch(getSearchPageVideos(false));
        }
    }, [dispatch, navigate, searchTerm]);

    return (
        <div className='max-h-screen overflow-auto'>
            <div style={{ height: "7vh" }}>
                <Navbar />
            </div>
            <div className='flex' style={{ height: "92.5vh" }}>
                <Sidebar />
                {
                    videos.length ? (
                        <div className='py-6 pl-6 flex flex-col gap-5 w-full'>
                            <InfiniteScroll
                                dataLength={videos.length}
                                next={() => dispatch(getSearchPageVideos(true))}
                                hasMore={videos.length < 500}
                                loader={<Spinner />}
                                height={650}
                            >
                                {videos.map((item, index) => (
                                    (<div>
                                        <ShCard key={item.id || index} data={item} />
                                    </div>)
                                ))}

                            </InfiniteScroll>
                        </div>
                    ) : (
                        <Spinner />
                    )
                }
            </div>
        </div>
    );
}
