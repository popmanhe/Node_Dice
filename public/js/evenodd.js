/*Knockoujs view model*/
var koVM = $.extend({}, baseVM, autoBetVM, {
    //properties
    highRoll: ko.observable(0.0001),
    steps: ko.observable(100),
    amountdesc: ko.observable(''),
    payout: ko.observable(1.98),
    rule: ko.observable('The random number is encrypted with server salt and client salt. You can change your client salt anytime, however, the server salt and random number are changed for every bet and only valid for 10 seconds. The encrypted string is shown to you before each bet. You bet whether the random number is even or odd before times up. The random number and server salt will be revealed after each bet and thus can be verified.'),
    restartVisible: ko.observable(true),
    selectedNumber: ko.observable(-1),
    gameId: ko.observable(1),
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
    clickBet: function (d) {
        this.baseAmount(this.betAmount());
        submitBet(d);
    },
    submitBet: function (d) {
        if (parseFloat(this.betAmount()) < 0) {
            showNotification('', 'Bet amount has to be greater than ZERO.', 'danger');
            return;
        }
        this.selectedNumber(d);
        this.betted(true);
        this.baseAmount(this.betAmount());
        


        proxy.server.submitResult({ w: this.betAmount(), sn: d, f: this.coinName() });
    }
});

koVM.timeleft = ko.observable(koVM.steps() / 10);

koVM.profitOnWin = ko.computed(function () {
    var amount = parseFloat((koVM.betAmount() * koVM.payout()));
    return amount.toFixed(10);
}).extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 } });

koVM.buttonEnable = ko.computed(function () {
    return koVM.timeleft() > 0;
});
/*Knockoujs view model*/


/* signalR register */
//var proxy = $.connection.evenOddHub;
//signalR client functions
//proxy.client.showResult = function (result) {

//    var win = true;
//    if ((result.rn % 2) == koVM.selectedNumber()) {
//        showNotification('', 'You won', 'success');
//        koVM.balance((koVM.balance() * 1 + koVM.betAmount() * (koVM.payout() - 1)).toFixed(10));
//    }
//    else {
//        showNotification('', 'You lost', 'danger');
//        koVM.balance((koVM.balance() - koVM.betAmount()).toFixed(10));
//        win = false;
//    }

//    var bet = {
//        gt: result.gt,
//        sn: koVM.selectedNumber(),
//        cs: koVM.clientsalt(),
//        ss: result.ss,
//        rn: result.rn,
//        w: koVM.betAmount(),
//        bid: result.bid,
//        en: koVM.encrypted(),
//        c: result.c
//    }
//    if (myBetsArray().length > 100)
//        myBetsArray().pop();
//    myBetsArray.unshift(convertBetResult(bet));
//    //myBetsArray.sort(descendant);

//    koVM.randNum(result.rn);
//    koVM.serversalt(result.ss);

//    if (koVM.numberofRolls() > 1) {
//        koVM.getRandNum().done(function () {
//            koVM.randNum('?????');
//            koVM.serversalt('');
//            if (win) {
//                if (koVM.incWin() == 0) {
//                    koVM.betAmount((koVM.baseAmount() * 1).toFixed(10));
//                }
//                else {
//                    koVM.betAmount((koVM.betAmount() * (1 + koVM.incWin() / 100)).toFixed(10));
//                }
//            }
//            else {
//                if (koVM.incLoss() == 0) {
//                    koVM.betAmount((koVM.baseAmount() * 1).toFixed(10));
//                }
//                else {
//                    koVM.betAmount((koVM.betAmount() * (1 + koVM.incLoss() / 100)).toFixed(10));
//                }
//            }
//            koVM.submitBet(koVM.selectedNumber());
//            koVM.numberofRolls(koVM.numberofRolls() - 1);
//        });

//    }
//    koVM.betted(false);

//};

/* Page functions */

$(function () {
    ko.applyBindings(koVM);
 
    //if (isAuthenticated)
        pageStart();
});
function pageStart() {
    
    //getMyBets();
    //getAllBets();
    
   
    //getUser();
      //});
}
function convertBetResult(bet) {
    bet.gt = moment(bet.gt).format('YYYY-MM-DD HH:mm:ss');
    if (bet.rn % 2 == bet.sn) {
        bet.pf = '<span class="text-primary"><strong>' + (bet.w * (koVM.payout() - 1)).toFixed(10) + ' ' + bet.c + '</strong></span>';
    }
    else {
        bet.pf = '<span class="text-danger"><strong>' + (bet.w * -1).toFixed(10) + ' ' + bet.c + '</strong></span>';
    }
    bet.rn1 = bet.rn + ' % 2 = ' + (bet.rn % 2);
    bet.sn1 = bet.sn == 0 ? 'Even' : 'Odd';
    bet.w = (bet.w * 1).toFixed(10) + ' ' + bet.c;
    bet.p = 1.98;
    return bet;
}



