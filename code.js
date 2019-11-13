figma.showUI(__html__);
figma.ui.onmessage = (msg) => {
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
