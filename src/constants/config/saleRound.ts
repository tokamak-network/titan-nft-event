const currentTimestamp = Math.floor(new Date().getTime() / 1000);
const firstRoundEnd = currentTimestamp + 10;
const secondRoundEnd = currentTimestamp + 20;
const thirdRoundEnd = currentTimestamp + 30;

export { firstRoundEnd, secondRoundEnd, thirdRoundEnd };
