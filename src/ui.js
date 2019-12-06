import "./StyleSheets/FigmaStyleSheet.css";

var getAddTicketButton = document.getElementById("btnAddTicket");
var getCancelButton = document.getElementById("btnCancel");
var getTextBoxElement = document.getElementById("ticketNumberContainer");
var getOuterBoxElements = document.getElementsByClassName("outerBox");

getAddTicketButton.addEventListener("click", () => {
  getTextBoxElement.style.display = "block";
  getCancelButton.style.display = "block";
  getAddTicketButton.style.display = "none";
});

getCancelButton.addEventListener("click", () => {
  getTextBoxElement.style.display = "none";
  getCancelButton.style.display = "none";
  getAddTicketButton.style.display = "block";
  document.getElementById("ticketNumberContainer").textContent = "";
});

setBGColorOnClick = element => {
  for (let node of getOuterBoxElements) {
    node.style.backgroundColor = "";
  }
  element.parentNode.parentNode.style.backgroundColor = "#ddf1ff";
};

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
    getStatus.value;
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

  //Clear contents after success
};
