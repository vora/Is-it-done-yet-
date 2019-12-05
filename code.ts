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

const iFrameProps: ShowUIOptions = {
  width: 260,
  height: 300
};

const setNamePrefix = (param: IPluginMessage) => {
  let ticketNumber = param.message.ticketNumber
    ? " " + param.message.ticketNumber
    : "";

  let namePrefix =
    setStatusColor(param.message.status) +
    " " +
    param.message.status +
    ticketNumber;

  return namePrefix;
};

const setUpdatedNamePrefix = (name: string, param: IPluginMessage) => {
  var splitName = name.split(" ");

  splitName[0] = param.message.status
    ? setStatusColor(param.message.status)
    : splitName[0];

  if (splitName[1] != "Needs") {
    splitName[1] = param.message.status;
  } else {
    splitName[1] = param.message.status;
    splitName.splice(2, 1);
  }

  var updatedName = splitName.join(" ");
  return updatedName;
};

const determineIfStatusSet = (name: string) => {
  if (
    name.includes("Active") ||
    name.includes("Approved") ||
    name.includes("In-development") ||
    name.includes("In-review") ||
    name.includes("Needs changes")
  ) {
    return true;
  } else return false;
};

const setFrameNodeData = (name: string, param: IPluginMessage) => {
  const frameData: IFrameNodeData = {
    ticketNumber: param.message.ticketNumber ? param.message.ticketNumber : "",
    status: param.message.status ? param.message.status : null,
    frameName: name
  };

  return frameData;
};

const updateFrameNodeData = (
  frameNodeInformation: string,
  node: SceneNode,
  param: IPluginMessage
) => {
  var parsedFrameData: IFrameNodeData = JSON.parse(frameNodeInformation);
  let ticketNumber = parsedFrameData.ticketNumber;
  var newNodeName: string;
  let frameNodeData: IFrameNodeData;

  //What are the different conditions
  //We have the frameName Information that was previously set
  //We need to extact only name and ticketNumber from that parsedData
  //Then, we need to see if ticketNumber exists for that frameNode
  //(1) If it does, then from the node.name property, we need to extract the currentName (because it could have been changed from the UI)
  //(1) We do this by splliting the node.name on (" ") and extracting everything after x[2] and joining that or splicing first three elements - that will leave us only with the name
  //(1) Then from the param object, we get the new status and ticketNumber (if it is null in param object, we use the existing ticketNumber)
  //(1) We now have status, ticketNumber and the originalName - we combine all of this, setPluginData and return newName
  //(2) If ticketNumber does not exist for that frameNode
  //(2) Then we need to extract the name from node.name by splicing first and second element of the split array
  //(2) Then from the param object, we get the new status and ticketNumber (since ticketNumber was originally null, we just have to update)
  //(2) We now have status, ticketNumber and the originalName - we combine all of this, setPluginData and return newName

  if (ticketNumber != "") {
    let splitNodeName = node.name.split(" ");

    if (splitNodeName[1] != "Needs") {
      splitNodeName.splice(0, 3);
    } else {
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

      frameNodeData = setFrameNodeData(splitNodeName.join(" "), {
        type: param.type,
        message: {
          status: param.message.status,
          ticketNumber: ticketNumber
        }
      });
    } else {
      console.log("In here");
      console.log("Param", param);
      console.log("PluginData", parsedFrameData);
      console.log("SplitNodeName", splitNodeName);
      newNodeName =
        setStatusColor(param.message.status) +
        " " +
        param.message.status +
        " " +
        param.message.ticketNumber +
        " " +
        splitNodeName.join(" ");

      frameNodeData = setFrameNodeData(splitNodeName.join(" "), param);
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
        setStatusColor(param.message.status) +
        " " +
        param.message.status +
        " " +
        splitNodeName.join(" ");

      frameNodeData = setFrameNodeData(splitNodeName.join(" "), param);
    } else {
      newNodeName =
        setStatusColor(param.message.status) +
        " " +
        param.message.status +
        " " +
        param.message.ticketNumber +
        " " +
        splitNodeName.join(" ");

      frameNodeData = setFrameNodeData(splitNodeName.join(" "), param);
    }
  }

  node.setPluginData(node.id, JSON.stringify(frameNodeData));
  return newNodeName;
};

const setStatusColor = (statusType: StatusType) => {
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

figma.showUI(__html__, iFrameProps);

figma.ui.onmessage = (param: IPluginMessage) => {
  if (param.type === "apply_status") {
    figma.currentPage.selection.forEach(node => {
      var nodePluginData = node.getPluginData(node.id);

      console.log("Retrieved Data", nodePluginData);

      if (nodePluginData.length == 0) {
        node.setPluginData(
          node.id,
          JSON.stringify(setFrameNodeData(node.name, param))
        );
        node.name = setNamePrefix(param) + " " + node.name;
      } else {
        node.name = updateFrameNodeData(nodePluginData, node, param);
      }
    });
  }

  figma.closePlugin();
  figma.notify("Status updated for selected frames successfully");
};
