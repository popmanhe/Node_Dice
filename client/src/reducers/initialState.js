export default {
  chat: {
    messages: []
  },
  user: { userName: null, isLoggedIn: false },
  dice: {
    isRolling: false,
    autoBet: { numberOfRolls: 1, stopWin: 0, stopLoss: 0, increaseOnLose: 0, increaseOnWin: 0 },
    coins: []
  },
  raffle: {}
};
