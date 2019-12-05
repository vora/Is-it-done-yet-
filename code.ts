type StatusType =
  | "Active"
  | "In-review"
  | "Needs changes"
  | "Approved"
  | "In-development";

interface IMessageType {
  ticketNumber: string;
  status: StatusType;
}
interface IPluginMessage {
  type: string;
  message: IMessageType;
}

interface IFrameNodeData {
  status: StatusType;
  ticketNumber?: string;
  frameName: string;
}

const iFrameWindowDimensions: ShowUIOptions = {
  width: 280,
  height: 310
};

const setFrameNodeNameFunc = (param: IPluginMessage) => {
  let ticketNumber = param.message.ticketNumber
    ? " " + param.message.ticketNumber
    : "";

  let namePrefix =
    setStatusColorFunc(param.message.status) +
    " " +
    param.message.status +
    ticketNumber;

  return namePrefix;
};

const updateFrameNodeNameFunc = (
  frameNodeInformation: string,
  node: SceneNode,
  param: IPluginMessage
) => {
  var parsedFrameData: IFrameNodeData = JSON.parse(frameNodeInformation);
  let ticketNumber = parsedFrameData.ticketNumber;
  var newNodeName: string;
  let frameNodeData: IFrameNodeData;

  if (ticketNumber != "") {
    let splitNodeName = node.name.split(" ");

    if (splitNodeName[1] != "Needs") {
      splitNodeName.splice(0, 3);
    } else {
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
    } else {
      newNodeName =
        setStatusColorFunc(param.message.status) +
        " " +
        param.message.status +
        " " +
        param.message.ticketNumber +
        " " +
        splitNodeName.join(" ");

      frameNodeData = setFrameNodePluginDataFunc(
        splitNodeName.join(" "),
        param
      );
    }
  } else {
    let splitNodeName = node.name.split(" ");

    if (splitNodeName[1] != "Needs") {
      splitNodeName.splice(0, 2);
    } else {
      splitNodeName.splice(0, 3);
    }

    if (param.message.ticketNumber.length == 0) {
      newNodeName =
        setStatusColorFunc(param.message.status) +
        " " +
        param.message.status +
        " " +
        splitNodeName.join(" ");

      frameNodeData = setFrameNodePluginDataFunc(
        splitNodeName.join(" "),
        param
      );
    } else {
      newNodeName =
        setStatusColorFunc(param.message.status) +
        " " +
        param.message.status +
        " " +
        param.message.ticketNumber +
        " " +
        splitNodeName.join(" ");

      frameNodeData = setFrameNodePluginDataFunc(
        splitNodeName.join(" "),
        param
      );
    }
  }

  node.setPluginData(node.id, JSON.stringify(frameNodeData));
  return newNodeName;
};

const setFrameNodePluginDataFunc = (name: string, param: IPluginMessage) => {
  const frameData: IFrameNodeData = {
    ticketNumber: param.message.ticketNumber ? param.message.ticketNumber : "",
    status: param.message.status ? param.message.status : null,
    frameName: name
  };

  return frameData;
};

const setStatusColorFunc = (statusType: StatusType) => {
  var emojiHex: string = "";

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

const selectFrameAlert =
  "Kindly select a frame that you'd like to apply the status for";
const selectStatusAlert =
  "Kindly select a status that you'd like to update the frame with";
const statusSuccessNotification =
  "Status updated for selected frames successfully";

figma.showUI(__html__, iFrameWindowDimensions);

figma.ui.onmessage = (param: IPluginMessage) => {
  if (figma.currentPage.selection.length == 0) {
    alert(selectFrameAlert);
    figma.closePlugin();
    return false;
  }

  if (param.message.status == null) {
    alert(selectStatusAlert);
    return false;
  }

  if (param.type === "apply_status") {
    figma.currentPage.selection.forEach(node => {
      var nodePluginData = node.getPluginData(node.id);
      if (nodePluginData.length == 0) {
        node.setPluginData(
          node.id,
          JSON.stringify(setFrameNodePluginDataFunc(node.name, param))
        );
        node.name = setFrameNodeNameFunc(param) + " " + node.name;
      } else {
        node.name = updateFrameNodeNameFunc(nodePluginData, node, param);
      }
    });

    figma.closePlugin();
    figma.notify(statusSuccessNotification);
  }
};
