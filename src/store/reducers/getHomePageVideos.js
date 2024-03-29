import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/searchPageVideos",
    async (isNext, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
        } = getState();

        try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
                params: {
                    maxResults: 20,
                    q: "drop x out",
                    key: 'AIzaSyCbI-l6PZJKfY8Q9LkADUOYFZD5I0NfWx8',
                    part: "snippet",
                    type: "video",
                    pageToken: isNext ? nextPageTokenFromState : undefined,
                },
            });

            const items = response.data.items;
            const parsedData = await parseData(items);

            return { parsedData: [...videos, ...parsedData], nextPageToken: nextPageTokenFromState };
        } catch (error) {
            console.error("Error fetching home page videos:", error);
            throw error;
        }
    }
);
