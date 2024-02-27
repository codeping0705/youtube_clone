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
    }, [dispatch])

    return (
        <div className='max-h-screen overflow-auto'>
            <div style={{ height: "7.5vh" }}>
                <Navbar />
            </div>
            <div className='flex' style={{ height: "92.5vh" }}>
            <Sidebar />
                {
                    videos.length ? (
                        <InfiniteScroll
                            dataLength={videos.length}
                            next={() => dispatch(getHomePageVideos)}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={650}
                        >

                            {videos.map((item => {
                                return <Card key={item.id} data={item} />
                            }))}
                        </InfiniteScroll>
                    ) : (
                        <Spinner />
                    )
                }
            </div>
        </div>
    )
}
