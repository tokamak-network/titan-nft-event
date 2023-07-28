import { useEffect, useState } from "react";
import {
  firstRoundEnd,
  secondRoundEnd,
  thirdRoundEnd,
} from "../constants/config/saleRound";

export function useTimestampcomparator() {
  const [isFirstTimestampPassed, setIsFirstTimestampPassed] = useState(false);
  const [isSecondTimestampPassed, setIsSecondTimestampPassed] = useState(false);
  const [isThirdTimestampPassed, setIsThirdTimestampPassed] = useState(false);

  useEffect(() => {
    const compareTimestamp = () => {
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);
      setIsFirstTimestampPassed(currentTimestamp >= firstRoundEnd);
    };
    const compareTimestamp2 = () => {
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);
      setIsSecondTimestampPassed(currentTimestamp >= secondRoundEnd);
    };
    const compareTimestamp3 = () => {
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);
      setIsThirdTimestampPassed(currentTimestamp >= thirdRoundEnd);
    };

    const intervalId = setInterval(compareTimestamp, 1000);
    const intervalId2 = setInterval(compareTimestamp2, 1000);
    const intervalId3 = setInterval(compareTimestamp3, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
      clearInterval(intervalId3);
    };
  }, []);

  return {
    isFirstTimestampPassed,
    isSecondTimestampPassed,
    isThirdTimestampPassed,
  };
}
