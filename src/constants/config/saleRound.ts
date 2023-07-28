const currentTimestamp = Math.floor(new Date().getTime() / 1000);
const firstRoundEnd = currentTimestamp + 600;
const secondRoundEnd = currentTimestamp + 1200;
const thirdRoundEnd = currentTimestamp + 1800;

export { firstRoundEnd, secondRoundEnd, thirdRoundEnd };
