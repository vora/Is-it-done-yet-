export const setFrameNodeNameFunc = (param) => {
    let ticketNumber = param.message.ticketNumber
        ? " " + param.message.ticketNumber
        : "";
    let namePrefix = setStatusColorFunc(param.message.status) +
        " " +
        param.message.status +
        ticketNumber;
    return namePrefix;
};
export const updateFrameNodeNameFunc = (frameNodeInformation, node, param) => {
    var parsedFrameData = JSON.parse(frameNodeInformation);
    let ticketNumber = parsedFrameData.ticketNumber;
    var newNodeName;
    let frameNodeData;
    if (ticketNumber != "") {
        let splitNodeName = node.name.split(" ");
        if (splitNodeName[1] != "Needs") {
            splitNodeName.splice(0, 3);
        }
        else {
            splitNodeName.splice(0, 4);
        }
        if (param.message.ticketNumber.length == 0) {
            newNodeName =
                setStatusColorFunc(param.message.status) +
                    " " +
                    param.message.status +
                    " " +
                    ticketNumber +
                    " " +
                    splitNodeName.join(" ");
            frameNodeData = setFrameNodePluginDataFunc(splitNodeName.join(" "), {
                type: param.type,
                message: {
                    status: param.message.status,
                    ticketNumber: ticketNumber
                }
            });
        }
        else {
            newNodeName =
                setStatusColorFunc(param.message.status) +
                    " " +
                    param.message.status +
                    " " +
                    param.message.ticketNumber +
                    " " +
                    splitNodeName.join(" ");
            frameNodeData = setFrameNodePluginDataFunc(splitNodeName.join(" "), param);
        }
    }
    else {
        let splitNodeName = node.name.split(" ");
        if (splitNodeName[1] != "Needs") {
            splitNodeName.splice(0, 2);
        }
        else {
            splitNodeName.splice(0, 3);
        }
        if (param.message.ticketNumber.length == 0) {
            newNodeName =
                setStatusColorFunc(param.message.status) +
                    " " +
                    param.message.status +
                    " " +
                    splitNodeName.join(" ");
            frameNodeData = setFrameNodePluginDataFunc(splitNodeName.join(" "), param);
        }
        else {
            newNodeName =
                setStatusColorFunc(param.message.status) +
                    " " +
                    param.message.status +
                    " " +
                    param.message.ticketNumber +
                    " " +
                    splitNodeName.join(" ");
            frameNodeData = setFrameNodePluginDataFunc(splitNodeName.join(" "), param);
        }
    }
    node.setPluginData(node.id, JSON.stringify(frameNodeData));
    return newNodeName;
};
export const setFrameNodePluginDataFunc = (name, param) => {
    const frameData = {
        ticketNumber: param.message.ticketNumber ? param.message.ticketNumber : "",
        status: param.message.status ? param.message.status : null,
        frameName: name
    };
    return frameData;
};
export const setStatusColorFunc = (statusType) => {
    var emojiHex = "";
    switch (statusType) {
        case "Active":
            emojiHex = "\uD83D\uDD35";
            break;
        case "Approved":
            emojiHex = "\uD83D\uDFE2";
            break;
        case "In-development":
            emojiHex = "\uD83D\uDFE3";
            break;
        case "In-review":
            emojiHex = "\uD83D\uDFE1";
            break;
        case "Needs changes":
            emojiHex = "\uD83D\uDD34";
            break;
    }
    return emojiHex;
};
