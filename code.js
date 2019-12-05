const iFrameWindowDimensions = {
    width: 260,
    height: 300
};
const setFrameNodeNameFunc = (param) => {
    let ticketNumber = param.message.ticketNumber
        ? " " + param.message.ticketNumber
        : "";
    let namePrefix = setStatusColor(param.message.status) +
        " " +
        param.message.status +
        ticketNumber;
    return namePrefix;
};
const updateFrameNodeNameFunc = (frameNodeInformation, node, param) => {
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
                setStatusColor(param.message.status) +
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
                setStatusColor(param.message.status) +
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
                setStatusColor(param.message.status) +
                    " " +
                    param.message.status +
                    " " +
                    splitNodeName.join(" ");
            frameNodeData = setFrameNodePluginDataFunc(splitNodeName.join(" "), param);
        }
        else {
            newNodeName =
                setStatusColor(param.message.status) +
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
const setFrameNodePluginDataFunc = (name, param) => {
    const frameData = {
        ticketNumber: param.message.ticketNumber ? param.message.ticketNumber : "",
        status: param.message.status ? param.message.status : null,
        frameName: name
    };
    return frameData;
};
const setStatusColor = (statusType) => {
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
figma.showUI(__html__, iFrameWindowDimensions);
figma.ui.onmessage = (param) => {
    if (param.type === "apply_status") {
        figma.currentPage.selection.forEach(node => {
            var nodePluginData = node.getPluginData(node.id);
            if (nodePluginData.length == 0) {
                node.setPluginData(node.id, JSON.stringify(setFrameNodePluginDataFunc(node.name, param)));
                node.name = setFrameNodeNameFunc(param) + " " + node.name;
            }
            else {
                node.name = updateFrameNodeNameFunc(nodePluginData, node, param);
            }
        });
    }
    figma.closePlugin();
    figma.notify("Status updated for selected frames successfully");
};
