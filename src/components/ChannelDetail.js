import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"

import {Videos, ChannelCard } from './'
import { fetchFromAPI } from "../utils/fetchFromAPI"


const ChannelDetail = () => {
  const [channelDetail, setchannelDetail ]= useState()
  const [videos , setVideos] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    const fetchResult = async () => {
      const data = await fetchFromAPI(`channels?part=snipppet&id=${id}`);
      setchannelDetail(data?.items[0]);

      const videoData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`)
      setVideos(videoData?.items);
    }
    fetchResult()
  },[id])

  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{
          height:'300px',
          background: 'radial-gradient(circle, rgba(185,193,246,1) 0%, rgba(36,5,177,1) 100%)',
          zIndex:10,
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px"/>
      </Box>
      <Box p="2" display="flex">
        <Box sx={{ mr: {sm: '100px'}}}/>
        <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail