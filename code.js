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
figma.showUI(__html__, iFrameProps);
function generateText(status, ticketNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
        let mytext = figma.createText();
        let ellipse = figma.createEllipse();
        ellipse.resize(25, 25);
        mytext.characters = status + " " + ticketNumber;
        figma.currentPage.appendChild(ellipse);
        figma.currentPage.appendChild(mytext);
    });
}
figma.ui.onmessage = (msg) => {
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
