import { setFrameNodeNameFunc, setFrameNodePluginDataFunc, updateFrameNodeNameFunc } from "./Modules/FigmaModules";
const iFrameWindowDimensions = {
    width: 280,
    height: 310
};
const selectFrameAlert = "Select a frame or multiple frames to apply the status to";
const selectStatusAlert = "Select a status to apply to selected frame(s)";
const statusSuccessNotification = "Successfully updated status for selected frame(s)";
figma.showUI(__html__, iFrameWindowDimensions);
figma.ui.onmessage = (param) => {
    if (figma.currentPage.selection.length == 0) {
        alert(selectFrameAlert);
        figma.closePlugin();
        return false;
    }
    if (param.message.status == null) {
        alert(selectStatusAlert);
        return false;
    }
    if (param.type === "apply_status") {
        figma.currentPage.selection.forEach(node => {
            var nodePluginData = node.getPluginData(node.id);
            if (nodePluginData.length == 0) {
                node.setPluginData(node.id, JSON.stringify(setFrameNodePluginDataFunc(node.name, param)));
                node.name = setFrameNodeNameFunc(param) + " " + node.name;
            }
            else {
                node.name = updateFrameNodeNameFunc(nodePluginData, node, param);
            }
        });
        figma.closePlugin();
        figma.notify(statusSuccessNotification);
    }
};
