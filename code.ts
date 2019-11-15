interface IMessageType {
  ticketNumber: string;
  status: string;
}
interface IPluginMessage {
  type: string;
  message: IMessageType;
}

figma.showUI(__html__);

figma.ui.onmessage = (msg: IPluginMessage) => {
  if (msg.type === "apply_status") {
    figma.currentPage.selection.forEach(node => {
      if (node.name) {
        node.name =
          msg.message.status + " " + msg.message.ticketNumber + " " + node.name;
      }
    });
  }

  figma.closePlugin();
};
