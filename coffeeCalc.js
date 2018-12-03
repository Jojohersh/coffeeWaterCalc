// variables
/*
  which epsom salt

  input epsom salt Weight
  magnesium content
  General Hardness (GH)

  baking soda input
  bicarbonate content
  carbonate hardness (KH)

displays:
  mgContentDisplay
  ghDisplay
  carbonateContentDisplay
  khDisplay
  epsomToUse
  sodaToUse
*/
var epsomChemWeight = document.querySelectorAll("select")[1].value;
var calcType = 0;
var epsomInput;
var mgContent;
var gh;

var sodaInput;
var bicarbContent;
var kh;

var calcTypeSelectBox = document.querySelector("select");
var mgContentDisplay = document.querySelector("#mgContentDisplay");
var ghDisplay = document.querySelector("#ghDisplay");
var bicarbonateContentDisplay = document.querySelector("bicarbonateContentDisplay");
var khDisplay = document.querySelector("khDisplay");
var epsomToUse = document.querySelector("epsomToUse");
var sodaToUse = document.querySelector("sodaToUse");
// event handlers
  /*
    epsom salt changed

    epsom salt weight changed
    baking soda weight changed
    mg content changed
    bicarbonate content changed
  */
calcTypeSelectBox.addEventListener("change", function() {
  // var sections = document.querySelectorAll(".inputs");
  if (calcTypeSelectBox.selectedIndex === 0) {
    console.log("inside the if statement...");
    // sections[0].classIndex.remove("hidden");
    // sections[1].classIndex.add("hidden");
    document.querySelector("#saltToHard").classList.remove("hidden");
    document.querySelector("#hardToSalt").classList.add("hidden");
  } else {
    console.log("inside the else statement...");
    document.querySelector("#saltToHard").classList.add("hidden");
    document.querySelector("#hardToSalt").classList.remove("hidden");
  }
});

// functions
  /*
    calculate epsomToHardness
    calculate sodaToHardness

    calculate mgToEpsom
    calculate carbonateToSoda
  */
