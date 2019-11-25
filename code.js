var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var iFrameProps = {
    width: 260,
    height: 300
};
const statusColors = {
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
const setColors = (fills, color) => {
    fills[0].color.r = color.r;
    fills[0].color.g = color.g;
    fills[0].color.b = color.b;
    return fills;
};
const determineCoordinatesPosition = (node, ellipseNode, textNode) => {
    var positionObj = {
        ellipseNodeCoordinateX: node.x + node.width - textNode.width - ellipseNode.width - 1,
        ellipseNodeCoordinateY: node.y - ellipseNode.height - 1.5,
        textNodeCoordianteX: node.x + node.width - textNode.width,
        textNodeCoordinateY: node.y - textNode.height
    };
    return positionObj;
};
const generateStatus = (node, status, color, ticketNumber) => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    let textNode = figma.createText();
    let ellipseNode = figma.createEllipse();
    const constraints = {
        horizontal: "SCALE",
        vertical: "SCALE"
    };
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
    ellipseNode.constraints = constraints;
    textNode.characters = status + " " + ticketNumber;
    textNode.fontSize = 9;
    textNode.constraints = constraints;
    var coordinateObj = determineCoordinatesPosition(node, ellipseNode, textNode);
    ellipseNode.x = coordinateObj["ellipseNodeCoordinateX"];
    ellipseNode.y = coordinateObj["ellipseNodeCoordinateY"];
    textNode.x = coordinateObj["textNodeCoordianteX"];
    textNode.y = coordinateObj["textNodeCoordinateY"];
    // figma.currentPage.appendChild(ellipseNode);
    // figma.currentPage.appendChild(textNode);
});
figma.ui.onmessage = (param) => {
    if (param.type === "apply_status") {
        figma.currentPage.selection.forEach(node => {
            if (node.type == "FRAME") {
                //node.clipsContent = false;
                var color = statusColors[param.message.status];
                generateStatus(node, param.message.status, color, param.message.ticketNumber);
                if (node.name) {
                    node.name = param.message.status + " " + param.message.ticketNumber;
                }
            }
        });
    }
    figma.closePlugin();
    figma.notify("Status has been added for selected frames");
};
