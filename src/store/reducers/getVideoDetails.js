import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawtoString } from "../../utils/convertRawtoString";
import { timeSince } from "../../utils/timeSince";

export const getVideoDetails = createAsyncThunk(
    "youtube/App/getVideoDetails",
    async (id) => {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
            params: {
                id,
                key: "AIzaSyCbI-l6PZJKfY8Q9LkADUOYFZD5I0NfWx8",
                part: "snippet,statistics",
                type: 'video',
            },
        });
        const parsedData = parseData(response.data.items[0]);
        return parsedData;

    }
);

export const parseData = async(item) => {

    const channelResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels`, {
        params: {
            id: `${item.snippet.channelId}`,
            key: "AIzaSyCbI-l6PZJKfY8Q9LkADUOYFZD5I0NfWx8",
            part: "snippet,statistics",
            type: 'channels',
        },
    })
    const snippet = item.snippet;
    const id = item.id;
    const statistics = item.statistics;

    const channelImage = channelResponse.data.items[0].snippet.thumbnails.default.url;
    const subscriberCount = channelResponse.data.items[0].statistics.subscriberCount;

    return {
        videoId: id,
        videoTitle: snippet.title,
        videoDescription: snippet.description,
        videoViews: convertRawtoString(statistics.viewCount),
        videoLikes: convertRawtoString(statistics.likeCount),
        videoAge: timeSince(new Date(snippet.publishedAt)),
        channelInfo: {
            id: snippet.channelId,
            image: channelImage,
            name: snippet.channelTitle,
            subscribers: convertRawtoString(subscriberCount, true),
        },
    };
};
