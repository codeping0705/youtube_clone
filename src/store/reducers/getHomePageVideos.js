import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
console.log("API-KEY :", API_KEY);

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/homePageVideos",
    async (isNext, { getState }) => {
            const {
                youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
            } = getState();
            
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q=%22drop%20x%20out%22&key=AIzaSyAws4urUZT6rxVS7aLH_QfY7XB98N42ilo&part=snippet&type=video`);

            const items = response.data.items;
            const parsedData = await parseData(items);

            return {parsedData:[...videos,parsedData],nextPageToken:nextPageTokenFromState}
    }
);
