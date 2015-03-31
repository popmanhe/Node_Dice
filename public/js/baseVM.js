var baseVM = {
    userGuid: ko.observable(''),
    userName: ko.observable(''),
    coinName: ko.observable('BTC'),
    clientsalt: ko.observable(''),
    serversalt: ko.observable(''),
    preClientSalt: ko.observable(''),
    preServerSalt: ko.observable(''),
    encrypted: ko.observable(),
    betted: ko.observable(false),
    balance: ko.observable(),
    funds: [],
    depositAddress: ko.observable(),
    withdawalAmount: ko.observable(),
    withdrawalAddress: ko.observable(),
    betAmount: ko.observable((0.00000001).toFixed(8)),
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
        if (this.toggleButton()) {
            this.toggleButton(false);
            getBalance();
        }
    },
    copyBalance: function () {
        baseVM.withdawalAmount(baseVM.balance());
    },
    toggleButton: ko.observable(true),
    generateAddress: function () {
        if (this.toggleButton()) {
            this.toggleButton(false);
            socket.emit('newBtcAddr', '');
        }
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
    
    if ($.cookie('newUser') && $.cookie('newUser') == '0') {
        socket.emit('existingUser', '');
    }
    else {
        createNewUser();
    }
    registerSocketEvents();
});

function registerSocketEvents() {
    socket.on('newUser', function (data) {
        if (data.error && data.error.code == 11000) { 
            showNotification('Username exists.', 'Please user a different name.', 'danger');
        }
        else {
            setUser(data);
            $('#nameUserModal').modal('hide');
        }
    });
    
    socket.on('existingUser', function (data) {
        if (data.clientSalt == '' && data.error == 'session expired') { 
            createNewUser(); //session expired and create a new user
        }
        else {
            setUser(data);
            $("#spinner").hide();
        }
    });
   
    socket.on('savingClientSalt', function (data) {
        if (data.error) {
            showNotification('', data.error, 'danger');
        }
        else {
            baseVM.preClientSalt(data.clientSalt);
            baseVM.preServerSalt(data.serverSalt);
            showNotification('', 'Client salt has been updated.', 'success');
        }
    });
    
    socket.on('withdrawalAddress', function (result) {
        if (result)
            showNotification('', 'Withdrawal address has been updated.', 'success');
        else
            showNotification('', 'Update withdrawal address failed.', 'danger');
    });

    socket.on('newBtcAddress', function (result) { 
        if (result.code)
            showNotification('', 'Getting new BTC address failed.', 'danger');
        else {
            baseVM.depositAddress(result.address);
            setInterval(getBalance, 30 * 1000);//refresh balance every 30 seconds for deposits
            showNotification('', 'A new BTC address updated.', 'success');
        }
        baseVM.toggleButton(true);
    });

    socket.on('getBalance', function (result) { 
        if (result.code)
            showNotification('', 'Getting deposit failed.', 'danger');
        else {
            baseVM.balance(result.balance.toFixed(8));
            if (baseVM.balance() != result.balance)
            showNotification('', 'Deposit updated.', 'success');
        }
        baseVM.toggleButton(true);
    });
}

function createNewUser() {
    $("#spinner").hide();
    $('#nameUserModal').modal({ backdrop: 'static' });
    $('#saveUserName').click(function () {
        socket.emit('newUser', $('#txtNameUser').val());
    });
}
function setUser(user) {
    baseVM.userGuid(user.userid);
    baseVM.userName(user.userName);
    baseVM.clientsalt(user.clientSalt);
    baseVM.serversalt(user.hashedServerSalt);
    baseVM.funds = user.funds;
    $.cookie('newUser', '0', { expires: new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000) });
    setCoin();
    if (onlineUsersArray) {
        if (onlineUsersArray.indexOf(user) == -1)
            onlineUsersArray.push(user);
    }
}

function setCoin() {
    if (baseVM.funds && baseVM.funds.length > 0) {
        $(baseVM.funds).each(function (i) {
            var f = baseVM.funds[i];
            if (baseVM.coinName() == f.coinName) {
                baseVM.balance((f.depositAmount - f.withdrawAmount + f.profit).toFixed(8));
                baseVM.depositAddress(f.depositAddress);
                if (f.depositAddress != '')
                    setInterval(getBalance, 30 * 1000);//refresh balance every 30 seconds for deposits
                baseVM.withdrawalAddress(f.withdrawAddress);
            }
        });
    }
}

function getBalance() {
    socket.emit('getBalance', baseVM.coinName());
}