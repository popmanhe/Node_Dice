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
        this.betAmount(10);
    },
    withdraw: function () { },
    saveWithdrawalAddress: function () {
        socket.emit('withdrawalAddress', baseVM.coinName(), baseVM.withdrawalAddress());
    },
    saveClientSalt: function () {
        socket.emit('clientSalt', baseVM.clientsalt());
    },
    refreshBalance: function () {
        
    },
    copyBalance: function () {
        baseVM.withdawalAmount(baseVM.balance());
    },
    generateAddress: function () {
        //get new btc/nxt address
        //not implemented
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

var socket;
$(function () {
    
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
    registerSocketEvents();
});

function registerSocketEvents() {
    socket.on('existingUser', function (data) {
        if (data.clientSalt == '' && data.error == 'session expired') { 
            socket.emit('newUser', ''); //session expired and create a new user
        }
        else {
            setUser(data);
            $("#spinner").hide();
        }
    });
    
    socket.on('newUser', function (data) {
        setUser(data);
        $("#spinner").hide();
    });
    
    socket.on('clientSalt', function (data) {
        if (data == '')
        showNotification('', 'Client salt has been updated.', 'success');
    });
    
    socket.on('withdrawalAddress', function (result) {
        if (result)
            showNotification('', 'Withdrawal address has been updated.', 'success');
        else
            showNotification('', 'Update withdrawal address failed.', 'danger');
    });
}

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

