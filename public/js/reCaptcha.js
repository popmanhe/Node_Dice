var verifyreCaptcha = function (response) {
    $.post('/reCaptCha', { 'g_recaptcha_response': response })
    .done(function (data) {
        switch (data) {
            case -1: showNotification('', 'Verification failed. Try again.', 'danger');
                break;
            case -2: showNotification('', 'Please wait a bit longer to verify again.', 'warn');
                break;
            default:
                baseVM.balance(data.balance.toFixed(8));
                showNotification('Congratuation! ', 'You just got ' + data.faucet + 'satos BTC.', 'success');
        }

    });
};