export const useTimeFormatter = () => {
  const formatTime = (startTime: string, endTime: string) => {
    const formattedStartTime = startTime.slice(0, 5);
    const formattedEndtime = endTime.slice(0, 5);
    return `${formattedStartTime} - ${formattedEndtime}`;
  };
  return { formatTime };
};
