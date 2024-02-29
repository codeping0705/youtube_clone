import axios from 'axios';
import { convertRawtoString } from './convertRawtoString';
import { parseVideoDuration } from './parseVideoDuration';
import { timeSince } from './timeSince';

export const parseRecommendedData = async (items) => {
    try {
        const videoIds = [];
        const channelIds = [];

        items.forEach((item) => {
            channelIds.push(item.snippet.channelId);
            videoIds.push(item.id.videoId);
        });

        const {
            data: { items: channelsData },
        } = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=API_KEY`
        );

        const parsedChannelsData = channelsData.map((channel) => ({
            id: channel.id,
            image: channel.snippet.thumbnails.default.url,
        }));

        const {
            data: { items: videosData },
        } = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=API_KEY`
        );

        const parseData = items.map((item, index) => {
            const { image: channelImage } = parsedChannelsData.find(
                (data) => data.id === item.snippet.channelId
            );

            const videoData = videosData[index];
            if (!videoData || !videoData.contentDetails) {
                return null; // Skip this item if video data is missing or incomplete
            }

            return {
                videoId: item.id.videoId,
                videoTitle: item.snippet.title,
                videoDescription: item.snippet.description,
                videoThumbnail: item.snippet.thumbnails.medium.url,
                videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                videoDuration: parseVideoDuration(
                    videoData.contentDetails.duration
                ),
                videoViews: convertRawtoString(
                    videoData.statistics?.viewCount || 0
                ),
                videoAge: timeSince(new Date(item.snippet.publishedAt)),
                channelInfo: {
                    id: item.snippet.channelId,
                    image: channelImage,
                    name: item.snippet.channelTitle,
                },
            };
        });

        // Filter out null values
        const filteredData = parseData.filter((item) => item !== null);

        return filteredData;
    } catch (error) {
        console.error('Error parsing data', error.message);
        return [];
    }
};
