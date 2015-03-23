var verifyreCaptcha = function (response) {
    $.post('/reCaptCha', { 'g_recaptcha_response': response })
    .done(function (data) {
        switch (data) {
            case -1: showNotification('', 'Verification failed. Try again.', 'danger');
                break;
            case -2: showNotification('', 'Please wait a bit longer to verify again.', 'danger');
                break;
            default:
                baseVM.balance(data.balance.toFixed(8));
                showNotification('Congratuation! ', 'You just got ' + data.faucet + ' satos BTC.', 'success');
                restartVerification();
        }

    });
},
    timeLeft = 2 * 60,
    restartVerification = function () {
        if (timeLeft > 0) {
            timeLeft -= 1;
            $('#faucetRestartTime').show().html(Math.floor(timeLeft / 60) + 'm:' + timeLeft % 60  + 's to verify again.');;
            $('#reCaptchaDiv').hide();
            setTimeout(restartVerification, 1000);
        }
        else {
            grecaptcha.reset();
            $('#reCaptchaDiv').show();
            $('#faucetRestartTime').hide();
            timeLeft = 2 * 60;
        }
    }