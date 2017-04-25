import toastr from '../lib/toastr.min';
import * as messages from '../constants/messages';

export const show = (title, content, type) => {
    toastr.options = { positionClass: "toast-bottom-right", preventDuplicates: true, progressBar: true, newestOnTop: false };

    switch (type) {
        case 'success':
            toastr.success(content, title); break;
        case 'info':
            toastr.info(content, title); break;
        case 'warning':
            toastr.warning(content, title); break;
        case 'error':
        case 'danger':
            toastr.error(content, title); break;
        default:
            toastr.info(content, title); break;
    }

};

export const UserNotLoggedin = () => {
    show(messages.USERNOTLOGGEDINTITLE, messages.USERNOTLOGGEDINTEXT, "warning");
};

export const UserLoggedin = () => {
    show(messages.USERLOGGEDINTITLE, messages.USERLOGGEDINTEXT, 'success');
};