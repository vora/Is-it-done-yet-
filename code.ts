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

interface INodeCoordinates {
  [propName: string]: number;
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

const determineCoordinatesPosition = (
  node: SceneNode,
  ellipseNode: EllipseNode,
  textNode: TextNode
) => {
  var positionObj: INodeCoordinates = {
    ellipseNodeCoordinateX:
      node.x + node.width - textNode.width - ellipseNode.width - 1,
    ellipseNodeCoordinateY: node.y - ellipseNode.height,
    textNodeCoordianteX: node.x + node.width - textNode.width,
    textNodeCoordinateY: node.y - textNode.height
  };

  return positionObj;
};

const generateStatus = async (
  node: SceneNode,
  status: string,
  color: IColorIndex,
  ticketNumber?: string
) => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  let textNode = figma.createText();
  let ellipseNode = figma.createEllipse();

  ellipseNode.resize(7, 7);

  ellipseNode.fills = [
    {
      type: "SOLID",
      color: {
        r: color.r / 255,
        g: color.g / 255,
        b: color.b / 255
      }
    }
  ];

  textNode.characters = status + " " + ticketNumber;
  textNode.fontSize = 6;

  var coordinateObj = determineCoordinatesPosition(node, ellipseNode, textNode);

  ellipseNode.x = coordinateObj["ellipseNodeCoordinateX"];
  ellipseNode.y = coordinateObj["ellipseNodeCoordinateY"];

  textNode.x = coordinateObj["textNodeCoordianteX"];
  textNode.y = coordinateObj["textNodeCoordinateY"];

  figma.currentPage.appendChild(ellipseNode);
  figma.currentPage.appendChild(textNode);
};

figma.ui.onmessage = (param: IPluginMessage) => {
  if (param.type === "apply_status") {
    figma.currentPage.selection.forEach(node => {
      var color = statusColors[param.message.status];
      generateStatus(
        node,
        param.message.status,
        color,
        param.message.ticketNumber
      );

      if (node.name) {
        node.name = param.message.status + " " + param.message.ticketNumber;
      }
    });
  }

  figma.closePlugin();
};
