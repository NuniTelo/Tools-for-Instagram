parser = require('instagram-id-to-url-segment');

/*
    Here we have a serious documentation problem.
    I wish luck if someone has to deal with the original code.
    Any type of direct message can only be sent 
    if we have it converted into a threadEntity.

    We have 2 cases:
    When it's in our inbox and when it's not

    -If it is in our inbox: We have to use a threadId 
    that we can get from getInbox.js:getInbox(ig)
    we can also use the userId

    -If it is not in our inbox: We have to use userId

*/

async function replyDirectMessage(ig, { threadId, userId }, message){ 
    let threadEntity = null;
    
    if (threadId) {
        threadEntity  = ig.entity.directThread(threadId);
    } else if (userId) {
        threadEntity = ig.entity.directThread([userId.toString()]);
    }
    
    if (!threadEntity) {
        return 'invalid_threadEntity';
    }
    
    let sendDm = await threadEntity.broadcastText(message);

    return sendDm ? "message_sent" : "something_went_wrong";
}

module.exports = replyDirectMessage;
