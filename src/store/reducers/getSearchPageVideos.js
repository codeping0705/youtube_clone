import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";

export const getSearchPageVideos = createAsyncThunk(
    "youtube/App/homePageVideos",
    async (isNext, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
        } = getState();

        try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
                params: {
                    q: `${searchTerm}`,
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
