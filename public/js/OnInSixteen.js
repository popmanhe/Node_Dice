
var selectedNums = ko.observableArray();
var initPayout = 15.84;
var koVM = $.extend({}, baseVM, {
    //properties
    highRoll: ko.observable(0.0001),
    steps: ko.observable(300),
    rule: ko.observable('The random number is encrypted with server salt and client salt. You can change your client salt anytime, however, the server salt and random number are changed for every bet and only valid for 10 seconds. The encrypted string is shown to you before each bet. Taking 16 from the nonce, the remainder is between 0 and 15. You bet which number remainder is before times up. The random number and server salt will be revealed after each bet and thus can be verified .'),
    payout: ko.observable(initPayout),
    gameId: ko.observable(2),
    //functions
    showSecret: function (data, event) {
        $(event.currentTarget).next().toggle();
    },
    initBet: function () {
        this.randNum('?????');
        this.serversalt('');
        selectedNums.removeAll();
        koVM.betted(false);
        this.getRandNum();
    },
    setNum: function (num) {
        if (selectedNums.indexOf(num) > -1) {
            selectedNums.remove(num);
        }
        else {
            selectedNums.push(num);
            selectedNums.sort(function (a, b) {
                return a == b ? 0 : (a < b ? -1 : 1)
            });
        }
        if (selectedNums().length > 1)
            koVM.payout((((initPayout - selectedNums().length)) / selectedNums().length).toFixed(2));
        else
            koVM.payout(initPayout);

    },
    submitResult: function () {

        if (koVM.balance() < koVM.betAmount() * selectedNums().length) {
            showNotification('', 'Balance not enough.', 'info');
            return;
        }

        if (selectedNums().length == 0) {
            showNotification('', 'You need to select at lease ONE number.', 'info');
            return;
        }

        this.betted(true);
        $('#progressbar').progressbar('setPosition', koVM.steps());

        proxy.server.submitResult({ sn: selectedNums().join(','), w: this.betAmount(), f: koVM.coinName() });
    },
    getRandNum: function () {
        return proxy.server.getRandNum(koVM.clientsalt(), koVM.coinName())
         .done(function (result) {
             koVM.encrypted(result);
             showProgressbar();
         });
    }
});
koVM.timeleft = ko.observable(koVM.steps() / 10);
koVM.buttonEnable = ko.computed(function () {
    return koVM.timeleft() > 0;
});
koVM.profitOnWin = ko.computed(function () {
    var amount = parseFloat((koVM.betAmount() * (initPayout - selectedNums().length)));
    return amount.toFixed(10);
})//.extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 } });
koVM.totalAmount = ko.computed(function () { return selectedNums().length * koVM.betAmount(); });
koVM.amountdesc = ko.computed(function () {
    var total = koVM.totalAmount();
    return 'The bet amount is per number. Total amount is <strong class=\'text-danger\'>' + total.toFixed(8) + koVM.coinName() + '</strong>.';
});
/*Knockoujs view model*/

/* signalR register */
var proxy = $.connection.oneInSixteen;
proxy.client.showResult = function (result) {
    if (result) {
        var num = result.rn % 16;
        if (selectedNums().length > 0)
            if (selectedNums.indexOf(num) > -1) {
                showNotification('', 'You won', 'success');
                koVM.balance((koVM.balance() * 1 + (koVM.betAmount() * koVM.payout())).toFixed(10));
            } else {
                showNotification('', 'You lost', 'danger');
                koVM.balance((koVM.balance() - (koVM.betAmount() * selectedNums().length)).toFixed(10));
            }

        koVM.randNum(result.rn + ' % 16 = ' + (result.rn % 16));
        koVM.serversalt(result.ss);


        var bet = {
            gt: result.gt,
            sn: selectedNums().join(','),
            cs: koVM.clientsalt(),
            ss: result.ss,
            rn: result.rn,
            w: koVM.betAmount(),
            bid: result.bid,
            en: koVM.encrypted(),
            c: result.c
        };

        myBetsArray.push(convertBetResult(bet));
        myBetsArray.sort(descendant);

    }
};
$(function () {
    ko.applyBindings(koVM);
    if (isAuthenticated)
        pageStart();
});
/* page functions */
function pageStart() {
    $.connection.hub.start()
           .done(function () {
               getMyBets();
               getAllBets();

               proxy.server.getClientSalt().done(function (result) {
                   koVM.clientsalt(result);
                   koVM.getRandNum();
               });

               getUser();
           });
}
function convertBetResult(bet) {
    bet.gt = moment(bet.gt).format('YYYY-MM-DD HH:mm:ss');
    var sn = bet.sn.split(',');

    if (sn.indexOf((bet.rn % 16) + '') > -1) {
        bet.pf = '<span class="text-primary"><strong>' + (bet.w * (koVM.payout() - sn.length)).toFixed(10) + ' ' + bet.c + '</strong></span>';
        bet.p = ((koVM.payout() - sn.length) / (sn.length)).toFixed(2);
    }
    else {
        bet.pf = '<span class="text-danger"><strong>' + (bet.w * sn.length * -1).toFixed(10) + ' ' + bet.c + '</strong></span>';
        bet.p = initPayout;
    }
    bet.w = (bet.w * sn.length).toFixed(10) + ' ' + bet.c;
    bet.rn1 = bet.rn + ' % 16 = ' + (bet.rn % 16);
    bet.sn1 = bet.sn;

    return bet;
}

$('#progressbar').on("positionChanged", function (e) {
    koVM.timeleft(((koVM.steps() - e.position) / 10).toFixed(1));
    if (e.position == koVM.steps()) {
        clearInterval(interval);
        if (!koVM.betted())
            proxy.server.showResult(koVM.gameId()).done(function (result) {
                if (result) {
                    koVM.randNum(result.rn);
                    koVM.serversalt(result.ss);
                }
            });
    }
});