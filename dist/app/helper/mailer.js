/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 3/08/2014
 */

'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mailer = function Mailer() {
    undefined.templates = {
        "messageReceived": {
            "file": "message-received.html",
            "subject": "[ eRealm Info & Tech] Message Received"
        },
        "newContactMessage": {
            "file": "new-contact-message.html",
            "subject": "[ eRealm Info & Tech] New Message from Customer"
        },
        "messagePlanReceived": {
            "file": "message-projectplan-received.html",
            "subject": "[ eRealm Info & Tech] ProjectPlan Received"
        },
        "newProjectplanMessage": {
            "file": "new-projectplan-message.html",
            "subject": "[ eRealm Info & Tech] New ProjectPlan from Customer"
        }
    };

    undefined.path = _path2.default.normalize(_path2.default.join(__dirname, '../templates/'));
    undefined.transport = _nodemailer2.default.createTransport(_config2.default.mail.transport, _lodash2.default.clone(_config2.default.mail.options) || {});
};

Mailer.prototype.sendTemplate = function (to, templateName, data) {
    var template = this.templates[templateName];
    if (!template) {
        return;
    }
    var compiledTemplate = template.compiledTemplate;
    if (!compiledTemplate) {
        var source = _fs2.default.readFileSync(_path2.default.join(this.path, template.file), 'utf8');
        compiledTemplate = this.templates[templateName].compiledTemplate = _handlebars2.default.compile(source);
    }
    return this.send({
        subject: template.subject,
        html: compiledTemplate(data),
        to: to
    });
};

Mailer.prototype.send = function (mailOptions) {

    if (!(mailOptions && mailOptions.subject && mailOptions.html)) {
        return;
    }

    var from = _config2.default.mail && _config2.default.mail.fromaddress,
        to = mailOptions.to;

    var logger = require('./logger');
    logger.info('Mail: ', JSON.stringify(mailOptions));

    mailOptions = _lodash2.default.extend(mailOptions, {
        from: from,
        to: to,
        generateTextFromHTML: true
    });

    try {
        this.transport.sendMail(mailOptions, function (error, response) {});
    } catch (err) {}
};

module.exports = new Mailer();
//# sourceMappingURL=mailer.js.map