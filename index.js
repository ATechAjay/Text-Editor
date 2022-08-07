let optionsButtons = document.querySelectorAll(".option-btn");
let advancedOptionButton = document.querySelectorAll(".adv-option-btn");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

const initialiser = () => {
  // fuction call for highlighting buttons
  // No highlights for links, unlink, redo, undo

  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //create dropdown menu
  fontList.map((value) => {
    let option = document.createElement("option");
    option.innerHTML = value;
    fontName.appendChild(option);
  });
  //font size allow only till 7
  for (let i = 1; i <= 7; i++) {
    const option = document.createElement("option");
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  //default size
  fontSizeRef.value = 5;
};

// Main Logic

const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

// for basic function which doesn't need parameters
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// options that require parameter 
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value)
    })
})

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");
    //if link has http then pass directly else add https
    if (/http/i.test(userLink)) {
      modifyText(linkButton.id, false, userLink);
    } else {
      userLink = "http://" + userLink;
      modifyText(linkButton.id, false, userLink);
    }
  });
// Highlight Clicked Button

const highlighter = (classname, needsRemoval) => {
  classname.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        // remove highligh from other buttons
        highlighterRemover(classname);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (classname) => {
  classname.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initialiser();
