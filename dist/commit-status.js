"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitStatusSuccess = exports.commitStatusPending = void 0;
const config = require("./config");
async function commitStatusPending(url) {
    await postCommitStatus(url, 'pending', 'awaiting release notes review');
}
exports.commitStatusPending = commitStatusPending;
async function commitStatusSuccess(url) {
    await postCommitStatus(url, 'success', 'release notes reviewed');
}
exports.commitStatusSuccess = commitStatusSuccess;
async function postCommitStatus(url, state, description) {
    const options = {
        json: true,
        compressed: true,
        headers: {
            Authorization: 'token ' + config.GITHUB_TOKEN,
        },
    };
    const statusPayload = {
        state,
        description,
        context: 'Release Notes Confirmation',
    };
    console.log(`sending commit status ${state} to ${url}`);
    const needle = require('needle');
    await needle('post', url, statusPayload, options);
    console.log('commit status sent');
}
//# sourceMappingURL=commit-status.js.map