interface IMessageType {
  ticketNumber: string;
  status: string;
}
interface IPluginMessage {
  type: string;
  message: IMessageType;
}

var iFrameProps: ShowUIOptions = {
  width: 260,
  height: 300
};

figma.showUI(__html__, iFrameProps);

async function generateText(status: string, ticketNumber?: string) {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  let mytext = figma.createText();
  let ellipse = figma.createEllipse();
  ellipse.resize(25, 25);
  mytext.characters = status + " " + ticketNumber;
  figma.currentPage.appendChild(ellipse);
  figma.currentPage.appendChild(mytext);
}

figma.ui.onmessage = (msg: IPluginMessage) => {
  if (msg.type === "apply_status") {
    figma.currentPage.selection.forEach(node => {
      generateText(msg.message.status, msg.message.ticketNumber);

      if (node.name) {
        node.name = msg.message.status + " " + msg.message.ticketNumber;
      }
    });
  }

  figma.closePlugin();
};
