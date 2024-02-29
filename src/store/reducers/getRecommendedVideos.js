import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseRecommendedData } from "../../utils/parseRecommendedData";

export const getRecommendedVideos = createAsyncThunk(
    "youtube/App/getRecommnededideos",
    async (videoId, { getState }) => {
        const {
            youtubeApp: { currentPlaying:{
                channelInfo:{id:channelId}
            } },
        } = getState();

        try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/activities`, {
                params: {
                    maxResults: 20,
                    q: "drop x out",
                    key: 'AIzaSyCbI-l6PZJKfY8Q9LkADUOYFZD5I0NfWx8',
                    part: "snippet,contentDetails",
                    type: `${videoId}`,
                    channelId: `${channelId}`,
                },
            });

            const items = response.data.items;
            const parsedData = await parseRecommendedData(items,videoId);

            return { parsedData};
        } catch (error) {
            console.error("Error fetching home page videos:", error);
            throw error;
        }
    }
);
