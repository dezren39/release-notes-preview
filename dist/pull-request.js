"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePullRequest = void 0;
const comment = require("./comment");
const commit = require("./commit");
const compose = require("./compose");
const commit_status_1 = require("./commit-status");
// TODO type
async function handlePullRequest(eventObj) {
    const issueUrl = eventObj.pull_request.issue_url;
    await comment.deleteExistingComments(issueUrl);
    const commitsData = await commit.getCommits();
    const message = compose.previewFromCommits(commitsData);
    if (!message) {
        console.log('no relevant changes detected, exiting gracefully');
        await commit_status_1.commitStatusSuccess(eventObj.pull_request.statuses_url);
        process.exit(0);
    }
    comment.postComment(issueUrl, message);
    await commit_status_1.commitStatusPending(eventObj.pull_request.statuses_url);
}
exports.handlePullRequest = handlePullRequest;
//# sourceMappingURL=pull-request.js.map