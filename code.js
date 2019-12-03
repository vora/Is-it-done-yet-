const iFrameProps = {
    width: 260,
    height: 300
};
const setNamePrefix = (param) => {
    let ticketNumber = param.message.ticketNumber
        ? " " + param.message.ticketNumber
        : "";
    let namePrefix = setStatusColor(param.message.status) +
        " " +
        param.message.status +
        ticketNumber;
    return namePrefix;
};
const setUpdatedNamePrefix = (name, param) => {
    var splitName = name.split(" ");
    splitName[0] = param.message.status
        ? setStatusColor(param.message.status)
        : splitName[0];
    if (splitName[1] != "Needs") {
        splitName[1] = param.message.status;
    }
    else {
        splitName[1] = param.message.status;
        splitName.splice(2, 1);
    }
    var updatedName = splitName.join(" ");
    return updatedName;
};
const determineIfStatusSet = (name) => {
    if (name.includes("Active") ||
        name.includes("Approved") ||
        name.includes("In-development") ||
        name.includes("In-review") ||
        name.includes("Needs changes")) {
        return true;
    }
    else
        return false;
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
figma.showUI(__html__, iFrameProps);
figma.ui.onmessage = (param) => {
    if (param.type === "apply_status") {
        figma.currentPage.selection.forEach(node => {
            if (!determineIfStatusSet(node.name)) {
                node.name = setNamePrefix(param) + " " + node.name;
            }
            else {
                node.name = setUpdatedNamePrefix(node.name, param);
            }
        });
    }
    figma.closePlugin();
    figma.notify("Status updated for selected frames successfully");
};
