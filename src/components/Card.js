import React from 'react';

export default function Card({ data }) {
    // Check if data.channelInfo is defined before accessing its properties
    const channelImage = data.channelInfo ? data.channelInfo.image : null;
    const channelName = data.channelInfo ? data.channelInfo.name : null;

    return (
        <div>
            <div>
                <div>
                    <span>{data.videoDuration}</span>
                    <img src={data.videoThumbnail} alt="Thumbnail" />
                </div>
                <div>
                    <div>
                        {/* Check if channelImage is defined before rendering */}
                        {channelImage && (
                            <a href='#'><img src={channelImage} alt='channelimage' /></a>
                        )}
                    </div>
                    <div>
                        <h3>
                            <a href='#'>{data.videoTitle}</a>
                        </h3>
                        <div>
                            <div>
                                {/* Check if channelName is defined before rendering */}
                                {channelName && (
                                    <a href='#'>{channelName}</a>
                                )}
                            </div>
                            <div>
                                <span>{data.videoViews}</span>
                                <span>{data.videoAge}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
