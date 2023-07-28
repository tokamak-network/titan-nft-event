import {
  firstRoundEnd,
  secondRoundEnd,
  thirdRoundEnd,
} from "../constants/config/saleRound";

export type Round_T = "1st" | "2nd" | "3rd";

export function checkSaleRound(soldTime: number): Round_T | "afterRound" {
  if (firstRoundEnd >= soldTime) return "1st";

  if (secondRoundEnd >= soldTime) return "2nd";

  if (thirdRoundEnd >= soldTime) return "3rd";

  return "afterRound";
}
