import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';

export default function Home() {
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);

    useEffect(() => {
        dispatch(getHomePageVideos(false));
    }, [dispatch]);

    const fetchMoreVideos = () => {
        dispatch(getHomePageVideos(false));
    };

    return (
        <div className='max-h-screen overflow-auto'>
            <div style={{ height: "7vh" }}>
                <Navbar />
            </div>
            <div className='flex' style={{ height: "92.5vh" }}>
                <Sidebar />
                {
                    videos.length ? (
                        <InfiniteScroll
                            dataLength={videos.length}
                            next={fetchMoreVideos}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={650}
                        >
                            <div className='grid gap-y-14 gap-x-10 grid-cols-3 p-10'>
                            {videos.map((item, index) => (
                                <Card key={item.id || index} data={item} />
                            ))}
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <Spinner />
                    )
                }
            </div>
        </div>
    );
}
