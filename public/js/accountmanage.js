var koVM = {
    username: ko.observable()
}

/* Page functions */
$(function () {
    ko.applyBindings(koVM);

    if (isAuthenticated) {
        koVM.username($('#UserName').val());
    }
});

$("#btnManageProfile").on("click", function () {
    $.post('/account/manage'
        , {
            __RequestVerificationToken: $("input[name=__RequestVerificationToken]").val()
            , UserName: $('#UserName').val()
            , OldPassword: $("#OldPassword").val()
            , NewPassword: $("#NewPassword").val()
            , ConfirmPassword: $("#ConfirmPassword").val()
            , Email: $("#Email").val()

        }
            , function (data) {
                if (data.result == 1) {
                    koVM.username($('#UserName').val());
                    $('#Profilepartial').load('/account/profilepartial');
                    showNotification('', 'Profile updated', 'success');
                }
                else {
                    $(data.errors).each(function (i, d) {
                        showNotification('', d[0].ErrorMessage, 'danger');
                    });
                }
            });

});
