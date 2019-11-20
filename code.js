var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
figma.ui.onmessage = (msg) => {
    if (msg.type === "apply_status") {
        figma.currentPage.selection.forEach((node) => __awaiter(this, void 0, void 0, function* () {
            yield figma.loadFontAsync({
                family: "Inter",
                style: "Medium"
            });
            let textStyle = figma.createTextStyle();
            textStyle.name = "Something here";
            var newText = figma.createText();
            // if (node.name) {
            //   node.name = msg.message.status + " " + msg.message.ticketNumber;
            // }
        }));
    }
    //figma.closePlugin();
};
