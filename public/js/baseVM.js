var baseVM = {
    userGuid: ko.observable(''),
    //username: ko.observable(''),
    coinName: ko.observable('BTC'),
    serversalt: ko.observable(''),
    encrypted: ko.observable(),
    randNum: ko.observable('?????'),
    betted: ko.observable(false),
    balance: ko.observable(),
    funds: [],
    depositAddress: ko.observable(),
    withdawalAmount: ko.observable(),
    withdrawalAddress: ko.observable(),
    betAmount: ko.observable((0.00000001).toFixed(8)),
    clientsalt: ko.observable(''),
    switchCoins: function (coinName) {
        baseVM.coinName(coinName);
        setCoin();
        switch (coinName) { 
            case 'BTC': this.betAmount((0.00000001).toFixed(8)); break;
            case 'NXT': this.betAmount(1); break;
        }
    },
    amountX2: function () {
        var amount = this.betAmount();
        this.betAmount((amount * 2).toFixed(8));
    },
    amountDiv2: function () {
        var amount = this.betAmount();
        this.betAmount((amount / 2).toFixed(8));
    },
    minAmount: function () {
        this.betAmount((0.00000001).toFixed(8));
    },
    maxAmount: function () {
        //var self = this;
        //proxy.server.getMaxAmount()
        //   .done(function (result) {
        //    self.betAmount((result).toFixed(8));
        //});
        return 10;
    },
    withdraw: function () { },
    saveWithdrawalAddress: function () {
        
        socket.emit('withdrawalAddress', baseVM.coinName(), baseVM.withdrawalAddress());
        //proxy.server.saveWithdrawalAddress(baseVM.coinName(), baseVM.withdrawalAddress())
        //.done(function (result) {
        //    if (result)
        //        showNotification('', 'Withdrawal address has been updated.', 'success');
        //    else
        //        showNotification('', 'Update withdrawal address failed.', 'danger');
        //});
    },
    saveClientSalt: function () {
        socket.emit('clientSalt', baseVM.clientsalt());
    },
    refreshBalance: function () {
        //proxy.server.refreshBalance(baseVM.coinName())
        //.done(function (result) {
        //    baseVM.balance((result * 1).toFixed(8));
        //    showNotification('', 'Balance updated.', 'success');
        //});
    },
    copyBalance: function () {
        baseVM.withdawalAmount(baseVM.balance());
    },
    generateAddress: function () {
        //proxy.server.generateAddress(baseVM.coinName())
        //.done(function (result) { baseVM.depositAddress(result); });
    }
};
var autoBetVM = {
    numberofRolls: ko.observable(1).extend({ min: 0 }),
    stopWin: ko.observable('0.00000000'),
    stopLoss: ko.observable('0.0000000'),
    incWin: ko.observable('0.00'),
    incLoss: ko.observable('0.00'),
    baseAmount: ko.observable(0),
    incRolls: function () { this.numberofRolls(this.numberofRolls() + 1); },
    decRolls: function () { this.numberofRolls() - 1 >= 0 ? this.numberofRolls(this.numberofRolls() - 1) : 0; },
};
var myBetsArray = ko.observableArray();
var allBetsArray = ko.observableArray();
var highRollArray = ko.observableArray();


$(function () {
    var socket;
    if (typeof (WebSocket) != "function") {
        socket = io();
    }
    else {
        /* Use websocket only */
        socket = io.connect({ transports: ['websocket'] });
    }
    
    if ($.cookie('newUser') && $.cookie('newUser') == 0) {
        socket.emit('existingUser', '');
    }
    else {
        socket.emit('newUser', '');
    }
    registerSocketEvents(socket);
});

function registerSocketEvents(socket) {
    socket.on('existingUser', function (data) {
        setUser(data);
    });
    
    socket.on('newUser', function (data) {
        setUser(data);
    });
    
    socket.on('clientSalt', function (data) {
        showNotification('', 'Client salt has been updated.', 'success');
    });
    
    socket.on('withdrawalAddress', function (result) {
        if (result)
            showNotification('', 'Withdrawal address has been updated.', 'success');
        else
            showNotification('', 'Update withdrawal address failed.', 'danger');
    });
}
//proxy.client.addToAllBets = function (bet) {
//    if (allBetsArray().length > 100)
//        allBetsArray().pop();
//    allBetsArray.unshift(convertBetResult(bet));
//    //allBetsArray.sort(descendant);

//    if (bet.w > koVM.highRoll()) {
//        if (highRollArray().length > 100)
//            highRollArray().pop();
//        highRollArray.unshift(convertBetResult(bet));
//        ////highRollArray.sort(descendant);
//    }
//}

//proxy.client.showNotification = function (title, content, type) {
//    showNotification(title, content, type);
//}

//if (!isAuthenticated) {
//    $('#loginModal').modal({
//        keyboard: true,
//        backdrop: 'static'
//    });
//    $('#loginModal').modal('show');
//}

function setUser(user) {
    $.cookie('newUser', 0);
    baseVM.userGuid(user.userid);
    baseVM.clientsalt(user.clientSalt);
    baseVM.serversalt(user.hashedServerSalt);
    baseVM.funds = user.funds;
    setCoin();
}

function setCoin() {
    if (baseVM.funds && baseVM.funds.length > 0) {
        $(baseVM.funds).each(function (i) {
            var f = baseVM.funds[i];
            if (baseVM.coinName() == f.coinName) {
                baseVM.balance(f.balance.toFixed(8));
                baseVM.depositAddress(f.depositAddress);
                baseVM.withdrawalAddress(f.withdrawAddress);
            }
        });
    }
}


function descendant(a, b) {
    return a.gt == b.gt ? 0 : (a.gt < b.gt ? 1 : -1)
}

function getHeightHistory() {
    heightHistoryArray.removeAll();
    proxy.server.getHeightHistory().done(function (result) {
        $(result).each(function (i) {
            //if (heightHistoryArray().indexOf(result[i]) == -1)
            heightHistoryArray.push(result[i]);
        });
    });
}
