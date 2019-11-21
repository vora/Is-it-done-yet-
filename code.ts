interface IMessageType {
  ticketNumber: string;
  status: string;
}
interface IPluginMessage {
  type: string;
  message: IMessageType;
}

interface IColorIndex {
  r: number;
  g: number;
  b: number;
}

interface IStatusColors {
  [propName: string]: IColorIndex;
}

var iFrameProps: ShowUIOptions = {
  width: 260,
  height: 300
};

const statusColors: IStatusColors = {
  Active: {
    r: 24,
    g: 160,
    b: 251
  },
  "In-review": {
    r: 255,
    g: 199,
    b: 0
  },
  "Needs changes": {
    r: 242,
    g: 72,
    b: 34
  },
  Approved: {
    r: 27,
    g: 196,
    b: 125
  },
  "In-development": {
    r: 255,
    g: 0,
    b: 255
  }
};

figma.showUI(__html__, iFrameProps);

const clone = val => {
  return JSON.parse(JSON.stringify(val));
};

const setColors = (fills: any, color: IColorIndex) => {
  fills[0].color.r = color.r;
  fills[0].color.g = color.g;
  fills[0].color.b = color.b;
  return fills;
};

const generateStatus = async (
  status: string,
  color: IColorIndex,
  ticketNumber?: string
) => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  let mytext = figma.createText();
  let ellipse = figma.createEllipse();
  ellipse.resize(15, 15);

  ellipse.fills = [
    {
      type: "SOLID",
      color: {
        r: color.r / 255,
        g: color.g / 255,
        b: color.b / 255
      }
    }
  ];

  mytext.characters = status + " " + ticketNumber;
  mytext.fontSize = 9;
  figma.currentPage.appendChild(ellipse);
  figma.currentPage.appendChild(mytext);
};

figma.ui.onmessage = (param: IPluginMessage) => {
  if (param.type === "apply_status") {
    figma.currentPage.selection.forEach(node => {
      var color = statusColors[param.message.status];
      generateStatus(param.message.status, color, param.message.ticketNumber);

      if (node.name) {
        node.name = param.message.status + " " + param.message.ticketNumber;
      }
    });
  }

  figma.closePlugin();
};
