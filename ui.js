var getAddTicketButton = document.getElementById("btnAddTicket");
var getCancelButton = document.getElementById("btnCancel");
var getTextBoxElement = document.getElementById("ticketNumberContainer");
var getBoxElements = document.getElementsByClassName("box");
var getAddSign = document.getElementById("spanDisplayAddSign");
var getInputButtonContainer = document.getElementById("buttonContainer");
var getRadioContainerElements = document.getElementsByClassName(
  "radioContainer"
);

getAddTicketButton.addEventListener("click", () => {
  getTextBoxElement.style.display = "block";
  getCancelButton.style.display = "block";
  getAddSign.style.display = "none";
  getInputButtonContainer.style.paddingLeft = "9px";
});

getCancelButton.addEventListener("click", () => {
  getTextBoxElement.style.display = "none";
  getCancelButton.style.display = "none";
  getAddSign.style.display = "inline";
  getInputButtonContainer.style.paddingLeft = "15px";
  document.getElementById("ticketNumberContainer").textContent = "";
});

[...getRadioContainerElements].forEach(element => {
  element.addEventListener("click", () => {
    for (let node of getBoxElements) {
      node.style.backgroundColor = "";
    }
    element.parentNode.style.backgroundColor = "#ddf1ff";
  });
});

document
  .getElementById("ticketNumberContainer")
  .addEventListener("keypress", e => {
    if (e.keyCode == 13) {
      e.preventDefault();
      processInputData();
    }

    if (e.keyCode == 32) {
      e.preventDefault();
    }
  });

document.getElementById("btnApplyChanges").addEventListener("click", () => {
  processInputData();
});

processInputData = () => {
  var getStatus = document.querySelector('input[name="status"]:checked');
  var getTextBoxContent = document.getElementById("ticketNumberContainer")
    .textContent;

  if (getStatus != null) {
    var getCheckedStatus = document.querySelector(
      'input[name="status"]:checked'
    ).value;
  } else {
    getCheckedStatus = null;
  }

  var pluginMessageObj = {
    pluginMessage: {
      type: "apply_status",
      message: {
        ticketNumber: getTextBoxContent,
        status: getCheckedStatus
      }
    }
  };

  parent.postMessage(pluginMessageObj, "*");
};
