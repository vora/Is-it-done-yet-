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

const iFrameProps: ShowUIOptions = {
  width: 260,
  height: 300
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
  var namePrefix =
    setStatusColor(param.message.status) +
    param.message.status +
    " " +
    param.message.ticketNumber;

  if (param.type === "apply_status") {
    figma.currentPage.selection.forEach(node => {
      if (node.name.startsWith("Frame")) {
        node.name = namePrefix + " " + node.name;
      } else {
        node.name = namePrefix;
      }
    });
  }

  figma.closePlugin();
  figma.notify("Status updated for selected frames successfully");
};
