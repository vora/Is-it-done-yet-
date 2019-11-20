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
    figma.currentPage.selection.forEach(async node => {
      await figma.loadFontAsync({
        family: "Inter",
        style: "Medium"
      });

      let textStyle = figma.createTextStyle();
      textStyle.name = "Something here";

      var newText = figma.createText();

      // if (node.name) {
      //   node.name = msg.message.status + " " + msg.message.ticketNumber;
      // }
    });
  }

  //figma.closePlugin();
};
