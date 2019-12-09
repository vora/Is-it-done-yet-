import { IPluginMessage } from "./src/Interfaces/PluginInterface";

import {
  setFrameNodeNameFunc,
  setFrameNodePluginDataFunc,
  updateFrameNodeNameFunc
} from "./src/Modules/PluginModules";

const iFrameWindowDimensions: ShowUIOptions = {
  width: 280,
  height: 310
};

const selectFrameAlert =
  "Select a frame or multiple frames to apply the status to";
const selectStatusAlert = "Select a status to apply to selected frame(s)";
const statusSuccessNotification =
  "Successfully updated status for selected frame(s)";

figma.showUI(__html__, iFrameWindowDimensions);

figma.ui.onmessage = (param: IPluginMessage) => {
  if (param.type == "resize_window") {
    if (param.message.resizeWindow == true) {
      figma.ui.resize(280, 340);
    } else {
      figma.ui.resize(280, 310);
    }
  }

  if (param.type === "apply_status") {
    if (figma.currentPage.selection.length == 0) {
      alert(selectFrameAlert);
      figma.closePlugin();
      return;
    }

    if (param.message.status == null) {
      alert(selectStatusAlert);
      return;
    }

    figma.currentPage.selection.forEach(node => {
      var nodePluginData = node.getPluginData(node.id);
      if (nodePluginData.length == 0) {
        node.setPluginData(
          node.id,
          JSON.stringify(setFrameNodePluginDataFunc(node.name, param))
        );
        node.name = setFrameNodeNameFunc(param) + " " + node.name;
      } else {
        node.name = updateFrameNodeNameFunc(nodePluginData, node, param);
      }
    });

    figma.closePlugin();
    figma.notify(statusSuccessNotification);
  }
};
