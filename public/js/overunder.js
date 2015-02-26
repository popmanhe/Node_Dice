/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */
/*Knockoujs view model*/
var koVM = $.extend({}, baseVM, autoBetVM, {
    //properties
    highRoll: ko.observable(0.0001),
    steps: ko.observable(100),
    amountdesc: ko.observable(''),
    payout: ko.observable(2).extend({ min: 2 }),
    rule: ko.observable('Please refer to verification page to understand how encryption works.'),
    //restartVisible: ko.observable(true),
    under: ko.observable(-1),
    gameId: ko.observable(5),
    selectedNumber: ko.observable(0),
    //functions
    showSecret: function (data, event) {
        $(event.currentTarget).next().toggle();
    },
    initBet: function () {
        this.randNum('?????');
        this.serversalt('');
        this.betted(false);
        this.getRandNum();
    },
    inc: function () { koVM.payout(koVM.payout() + 0.5); },
    dec: function () { koVM.payout() >= 2.5 ? koVM.payout(koVM.payout() - 0.5) : 2; },
    clickBet: function (d) {
        this.baseAmount(this.betAmount());
        this.submitBet(d);
    },
    cancelBet: function () {
        koVM.numberofRolls(1);
    },
    submitBet: function (d) {
        
        if (koVM.balance() < koVM.betAmount()) {
            showNotification('', 'Balance not enough.', 'danger');
            return;
        }
        
        this.betted(true);
        
        koVM.selectedNumber(d == 0 ? koVM.rollUnder() : koVM.rollOver());
        socket.emit('roll', { w: this.betAmount(), sn: this.selectedNumber(), coinName: this.coinName() });
    }
});

koVM.rollUnder = ko.computed(function () {
    return (100 / koVM.payout() * 0.99).toFixed(2);
});
koVM.rollOver = ko.computed(function () {
    return (100 - koVM.rollUnder()).toFixed(2);
});
koVM.isPayoutValid = ko.computed(function () {
    return koVM.payout() >= 2;
});
koVM.profitOnWin = ko.computed(function () {
    var amount = parseFloat((koVM.betAmount() * koVM.payout()));
    return amount.toFixed(10);
}).extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 } });

koVM.buttonEnable = ko.computed(function () {
    return !koVM.betted();
});
/*Knockoujs view model*/

/* Page functions */
$(function () {
    ko.applyBindings(koVM);
    getBetHistory();
    
    registerOverUnderEvents();

});

function registerOverUnderEvents() {
    
    socket.on('allbets', function (roll) {
        if (roll.userid == koVM.userGuid()) {
            showResult(roll);
            addToBetHistory(myBetsArray, roll);
        }
        addToBetHistory(allBetsArray, roll);
    });
    
    socket.on('getMyBets', function (result) {
        $(result).each(function (i) {
            addToBetHistory(myBetsArray, result[i], 1);
        });
    })
    socket.on('getAllBets', function (result) {
        $(result).each(function (i) {
            addToBetHistory(allBetsArray, result[i], 1);
        });
    })
}
function showResult(result) {
    var win = true;
    if ((result.selNum * 1 <= 49.5 && result.rollNum * 1 <= result.selNum * 1) 
     || (result.selNum * 1 >= 50.5 && result.rollNum * 1 >= result.selNum * 1)) {
        if (koVM.numberofRolls() == 1) //Don't show notification when auto betting
            showNotification('', 'Dice:' + result.rollNum + '. You won', 'success');
        koVM.balance((koVM.balance() * 1 + result.amount * (koVM.payout() - 1)).toFixed(10));
    }
    else {
        if (koVM.numberofRolls() == 1) //Don't show notification when auto betting
            showNotification('', 'Dice:' + result.rollNum + '. You lost', 'danger');
        koVM.balance((koVM.balance() - result.amount).toFixed(10));
        win = false;
    }
    //process auto betting
    if (koVM.numberofRolls() > 1) {
        var stop = false;
        if (win) {
            if (koVM.stopWin() * 1 > 0 && koVM.betAmount() >= koVM.stopWin()) { stop = true; }
            else if (koVM.incWin() == 0) {
                koVM.betAmount((koVM.baseAmount() * 1).toFixed(10));
            }
            else {
                koVM.betAmount((koVM.betAmount() * (1 + koVM.incWin() / 100)).toFixed(10));
            }
        }
        else {
            if (koVM.stopLoss() * 1 > 0 && koVM.betAmount() >= koVM.stopLoss()) { stop = true; }
            else if (koVM.incLoss() == 0) {
                koVM.betAmount((koVM.baseAmount() * 1).toFixed(10));
            }
            else {
                koVM.betAmount((koVM.betAmount() * (1 + koVM.incLoss() / 100)).toFixed(10));
            }
        }
        if (!stop) {
            koVM.submitBet(koVM.selectedNumber() <= 49.5 ? 0:1);
            koVM.numberofRolls(koVM.numberofRolls() - 1);
        }
    }
    else
        koVM.betted(false);
};
function addToBetHistory(betsArray, result, reverse) {
    var bet = {
        dice: result.rollNum,
        w: result.amount,
        gt: result.betTime,
        sn: result.selNum,
        unit: result.unit
    };
    if (betsArray().length > 100)
        betsArray().pop();
    if (!reverse)
        betsArray.unshift(convertBetResult(bet));
    else
        betsArray.push(convertBetResult(bet));
}


function getBetHistory() {
    
    socket.emit('getMyBets', '');
    socket.emit('getAllBets', '');
   
}
function convertBetResult(bet) {
    bet.gt = moment(bet.gt).format('YYYY-MM-DD HH:mm:ss');
    bet.dice = parseFloat(bet.dice);
    bet.payout = (bet.sn <= 49.5? 100 * 0.99 / bet.sn: 100 * 0.99 / (100 - bet.sn)).toFixed(1);
    if ((bet.sn <= 49.5 && bet.dice <= bet.sn) || (bet.sn >= 50.5 && bet.dice >= bet.sn)) {
        bet.pf = '<span class="text-primary"><strong>' + (bet.w * (bet.payout - 1)).toFixed(10) + ' ' + bet.unit + '</strong></span>';
    }
    else {
        bet.pf = '<span class="text-danger"><strong>' + (bet.w * -1).toFixed(10) + ' ' + bet.unit + '</strong></span>';
    }
    bet.sn = bet.sn <= 49.5 ? '<=' + bet.sn : '>=' + bet.sn;
    bet.w = (bet.w * 1).toFixed(10) + ' ' + bet.unit;
    
    return bet;
}

