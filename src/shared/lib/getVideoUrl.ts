export const getVideoUrl = (
    showId: number,
    seasonNumber: number,
    episodeNumber: number
  ): string => {
    const videoUrls: { [key: string]: string } = {
      "888-1-1": "https://play.boomstream.com/OVLHwdGD",
      "888-1-2": "https://play.boomstream.com/c2GPJlCC",
      "888-1-3": "https://play.boomstream.com/BYazsFX7",
      "888-1-4": "https://play.boomstream.com/uTs15fGl",
      "888-1-5": "https://play.boomstream.com/6aleSPXU",
      "888-1-6": "https://play.boomstream.com/AuktGSw3",
      "888-1-7": "https://play.boomstream.com/kgsY4UKO",
      "888-1-8": "https://play.boomstream.com/xZLjzjE9",
      "888-1-9": "https://play.boomstream.com/UpqUqJdT",
      "888-1-10": "https://play.boomstream.com/Qk5kUXct",
      "888-1-11": "https://play.boomstream.com/6U8PLgtO",
      "888-1-12": "https://play.boomstream.com/sUQXEJX4",
      "888-1-13": "https://play.boomstream.com/CY8DaFTH",
      "888-2-1": "https://play.boomstream.com/4Ftdat3F",
      "888-2-2": "https://play.boomstream.com/yMhzEpf0",
      "888-2-3": "https://play.boomstream.com/7UNu16QT",
      "888-2-4": "https://play.boomstream.com/PgilkJT0",
      "888-2-5": "https://play.boomstream.com/6CNBzOQA",
      "888-2-6": "https://play.boomstream.com/yGWZKZuq",
      "888-2-7": "https://play.boomstream.com/HgVKDdOF",
      "888-2-8": "https://play.boomstream.com/TPKSQiGZ",
      "888-2-9": "https://play.boomstream.com/IwYm8N92",
      "888-2-10": "https://play.boomstream.com/e1FRmLv5",
    };
  
    const key = `${showId}-${seasonNumber}-${episodeNumber}`;
    return videoUrls[key] || "";
  };