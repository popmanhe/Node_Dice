/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */
/*Knockoujs view model*/
var ouVM = $.extend({}, baseVM, autoBetVM, {
    //properties
    highRoll: ko.observable(0.0001),
    steps: ko.observable(100),
    amountdesc: ko.observable(''),
    payout: ko.observable(2).extend({ min: 2 }),
    rule: ko.observable('Please refer to verification page to understand how encryption works.'),
    under: ko.observable(-1),
    gameId: ko.observable(5),
    highRollers: ko.observable(1),
    selectedNumber: ko.observable(0),
    //functions
    inc: function () { ouVM.payout(ouVM.payout() + 0.5); },
    dec: function () { ouVM.payout() >= 2.5 ? ouVM.payout(ouVM.payout() - 0.5) : 2; },
    clickBet: function (d) {
        this.baseAmount(this.betAmount());
        this.submitBet(d);
    },
    cancelBet: function () {
        ouVM.numberofRolls(1);
    },
    submitBet: function (d) {
        if (ouVM.balance() < ouVM.betAmount()) {
            showNotification('', 'Balance not enough.', 'danger');
            return;
        }
        this.betted(true);
        ouVM.selectedNumber(d == 0 ? ouVM.rollUnder() : ouVM.rollOver());
        socket.emit('roll', { w: this.betAmount(), sn: this.selectedNumber(), coinName: this.coinName() });
    } 
});
//computed methods
ouVM.rollUnder = ko.computed(function () {
    return (100 / ouVM.payout() * 0.99).toFixed(2);
});
ouVM.rollOver = ko.computed(function () {
    return (100 - ouVM.rollUnder()).toFixed(2);
});
ouVM.isPayoutValid = ko.computed(function () {
    return ouVM.payout() >= 2;
});
ouVM.profitOnWin = ko.computed(function () {
    var amount = parseFloat((ouVM.betAmount() * ouVM.payout()));
    return amount.toFixed(10);
}).extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 } });

ouVM.buttonEnable = ko.computed(function () {
    return !ouVM.betted();
});
/*Knockoujs view model*/

/* Page functions */
$(function () {
    //Be able to bind nested view model in one page.
    ko.bindingHandlers.stopBinding = {
        init: function () {
            return { controlsDescendantBindings: true };
        }
    };

    ko.applyBindings(ouVM);
    
    var _overunder = new overunder(socket);
    _overunder.getBetHistory();
    _overunder.registerOverUnderEvents();

});

var overunder = function (socket) {
    this.socket = socket;
    
    if (!this.socket) {
        if (typeof (WebSocket) != "function") {
            this.socket = io();
        }
        else {
            /* Use websocket only */
            this.socket = io.connect({ transports: ['websocket'] });
        }
    }
}

overunder.prototype.registerOverUnderEvents = function () {
    this.rollResult();
    this.allBets();
    this.getMyBets();
    this.getAllBets();
}
//receive single bet result if anything goes wrong
overunder.prototype.rollResult = function () {
    this.socket.on('rollResult', function (result) {
        switch (result.code) {
            case -1: showNotification('Fund', 'Fund not enough', 'danger');
                break;
            case -2 : showNotification('Wager', 'Wager invalid', 'danger');
                break;
            case -3: showNotification('Wager', 'Wager has to be a valid number', 'danger');
                break;
        }
        ouVM.betted(false);
    });
}
//receive bets after loading
overunder.prototype.allBets = function () {
    var self = this;
    this.socket.on('allBets', function (roll) {
            if (roll.userid == ouVM.userGuid()) {
                self.showResult(roll);
                self.addToBetHistory(myBetsArray, roll);
            }
        self.addToBetHistory(allBetsArray, roll);
            if (roll.amount >= ouVM.highRollers())
                self.addToBetHistory(highRollArray, roll);
    });

}
//retrieve my bet history from server when loading
overunder.prototype.getMyBets = function () {
    var self = this;
    this.socket.on('getMyBets', function (result) {
            $(result).each(function (i) {
                self.addToBetHistory(myBetsArray, result[i], 1);
            });
        })
}
//retrieve all bet history from server when loading
overunder.prototype.getAllBets = function () {
    var self = this;
    this.socket.on('getAllBets', function (result) {
        $(result).each(function (i) {
            self.addToBetHistory(allBetsArray, this, 1);
            if (result[i].amount >= ouVM.highRollers())
                self.addToBetHistory(highRollArray, result[i], 1);
        });
    })
}
//show bet result in the list
overunder.prototype.showResult = function(result) {
    var win = true;
    if ((result.selNum * 1 <= 49.5 && result.rollNum * 1 <= result.selNum * 1) 
     || (result.selNum * 1 >= 50.5 && result.rollNum * 1 >= result.selNum * 1)) {
        if (ouVM.numberofRolls() == 1) //Don't show notification when auto betting
            showNotification('', 'Dice:' + result.rollNum + '. You won', 'success');
        ouVM.balance((ouVM.balance() * 1 + result.amount * (ouVM.payout() - 1)).toFixed(10));
    }
    else {
        if (ouVM.numberofRolls() == 1) //Don't show notification when auto betting
            showNotification('', 'Dice:' + result.rollNum + '. You lost', 'danger');
        ouVM.balance((ouVM.balance() - result.amount).toFixed(10));
        win = false;
    }
    //process auto betting
    if (ouVM.numberofRolls() > 1) {
        var stop = false;
        if (win) {
            if (ouVM.stopWin() * 1 > 0 && ouVM.betAmount() >= ouVM.stopWin()) { stop = true; }
            else if (ouVM.incWin() == 0) {
                ouVM.betAmount((ouVM.baseAmount() * 1).toFixed(10));
            }
            else {
                ouVM.betAmount((ouVM.betAmount() * (1 + ouVM.incWin() / 100)).toFixed(10));
            }
        }
        else {
            if (ouVM.stopLoss() * 1 > 0 && ouVM.betAmount() >= ouVM.stopLoss()) { stop = true; }
            else if (ouVM.incLoss() == 0) {
                ouVM.betAmount((ouVM.baseAmount() * 1).toFixed(10));
            }
            else {
                ouVM.betAmount((ouVM.betAmount() * (1 + ouVM.incLoss() / 100)).toFixed(10));
            }
        }
        if (!stop) {
            ouVM.submitBet(ouVM.selectedNumber() <= 49.5 ? 0:1);
            ouVM.numberofRolls(ouVM.numberofRolls() - 1);
        }
    }
    else
        ouVM.betted(false);
};

overunder.prototype.addToBetHistory = function (betsArray, result, reverse) {
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
        betsArray.unshift(this.convertBetResult(bet));
    else
        betsArray.push(this.convertBetResult(bet));
}
overunder.prototype.getBetHistory = function() {
    
    this.socket.emit('getMyBets', '');
    this.socket.emit('getAllBets', '');
   
}
overunder.prototype.convertBetResult= function(bet) {
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

