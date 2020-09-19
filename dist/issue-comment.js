"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIssueComment = void 0;
const needle = require('needle');
const config = require("./config");
const commit_status_1 = require("./commit-status");
// TODO type
async function handleIssueComment(eventObj) {
    const changesFrom = eventObj.changes.body.from;
    const markOfTheSabichFound = changesFrom.indexOf(config.ACKNOWLEDGEMENT.UNCHECKED) !== -1;
    const newComment = eventObj.comment.body;
    const markOfAcknowledgedSabich = newComment.indexOf(config.ACKNOWLEDGEMENT.CHECKED) !== -1;
    if (!(markOfTheSabichFound && markOfAcknowledgedSabich)) {
        console.log('some issue comment was edited but nothing interesting', markOfTheSabichFound, markOfAcknowledgedSabich);
        return;
    }
    const options = {
        json: true,
        compressed: true,
        headers: {
            Authorization: 'token ' + config.GITHUB_TOKEN,
        },
    };
    const pullRequest = await needle('get', eventObj.issue.pull_request.url, null, options);
    const statusesUrl = pullRequest.body.statuses_url;
    await commit_status_1.commitStatusSuccess(statusesUrl);
}
exports.handleIssueComment = handleIssueComment;
//# sourceMappingURL=issue-comment.js.map