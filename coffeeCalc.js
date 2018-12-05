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
// define sections
var sectionSaltToHard = document.querySelector("#saltToHard");
var sectionHardToSalt = document.querySelector("#hardToSalt");
// calculator options selectors
var calcTypeSelectBox = document.querySelector("select");
var epsomSaltSelector = document.querySelectorAll("select")[1];

//section 1 inputs
var epsomInput = sectionSaltToHard.querySelectorAll("input")[0];
var sodaInput = sectionSaltToHard.querySelectorAll("input")[1];
//section 2 inputs
var mgInput = sectionHardToSalt.querySelectorAll("input")[0];
var bicarbInput = sectionHardToSalt.querySelectorAll("input")[1];
//section 1 displays
var mgContentDisplay = document.querySelector("#mgContentDisplay");
var ghDisplay = document.querySelector("#ghDisplay");
var bicarbContentDisplay = document.querySelector("#bicarbContentDisplay");
var khDisplay = document.querySelector("#khDisplay");
//section 2 displays
var epsomToUse = document.querySelector("#epsomToUse");
var sodaToUse = document.querySelector("#sodaToUse");
//button
var calcButton = document.querySelector("button");
//variables
const mgChemWeight = 24.305;
const bicarbChemWeight = 61.017;
var epsomChemWeight = epsomSaltSelector.value;
const sodaChemWeight = 84.006;
const CaCO3ChemWeight = 100;

// 0 is ingredients to hardness, 1 is vice versa
var calcType = 0;
var epsomContent = 0;
var mgContent = 0;
var gh = 0;

var sodaContent = 0;
var bicarbContent = 0;
var kh = 0;


// event handlers
  /*
    calculator type changed

    epsom salt changed

    epsom salt weight changed
    baking soda weight changed
    mg content changed
    bicarbonate content changed
  */
calcTypeSelectBox.addEventListener("change", function() {
  // var sections = document.querySelectorAll(".inputs");
  if (calcTypeSelectBox.selectedIndex === 0) {
    sectionSaltToHard.classList.remove("hidden");
    sectionHardToSalt.classList.add("hidden");
  } else {
    sectionSaltToHard.classList.add("hidden");
    sectionHardToSalt.classList.remove("hidden");
  }
  calcType = calcTypeSelectBox.selectedIndex;
});

epsomSaltSelector.addEventListener("change", function() {
  epsomChemWeight = epsomSaltSelector.value;
  //update internal data using new epsom chemical weight
  mgContent = calcEpsomToHardness(validateInput(epsomInput.value));
  epsomToUse = calcHardnessToEpsom(mgContent);
  //refresh old display values with new epsom weight calculations
  updateDisplays();
});

epsomInput.addEventListener("change", function() {
  epsomContent = validateInput(this.value);
  mgContent = calcEpsomToHardness(epsomContent);
  mgContentDisplay.textContent = "";
  ghDisplay.textContent = "";
});

sodaInput.addEventListener("change", function() {
  sodaContent = validateInput(this.value);
  bicarbContent = calcSodaToHardness(sodaContent);
  bicarbContentDisplay.textContent = "";
  khDisplay.textContent = "";
});

mgInput.addEventListener("change", function() {
  mgContent = validateInput(this.value);
  epsomContent = calcHardnessToEpsom(mgContent);
  epsomToUse.textContent = "";
});

bicarbInput.addEventListener("change", function() {
  bicarbContent = validateInput(this.value);
  sodaContent = calcHardnessToSoda(bicarbContent);
  sodaToUse.textContent = "";
});

calcButton.addEventListener("click", function() {
  updateDisplays();
});

// functions
/*
  calculate epsomToHardness
  calculate sodaToHardness

  calculate mgToEpsom
  calculate carbonateToSoda

  update displays
*/
/*
calcEpsomToHardness(epsomSaltWeight)
  inputs:   epsomSaltWeight
        weight of epsom salt to calculate magnesium content
  outputs:  mgContent
        the grams magnesium content in a gallon of water
*/
function calcEpsomToHardness(epsomSaltWeight) {
  //converts g/gal of epsom to mg/L of epsom
  const unitConvertFactor = 1000 / 3.785;
  var epsomToMgFactor = mgChemWeight / epsomChemWeight;
  var mgContent = epsomSaltWeight * unitConvertFactor * epsomToMgFactor;
  mgContent = Number(Number.parseFloat(mgContent).toPrecision(3));
  return mgContent;
}
/*
calcHardnessToEpsom(mgContent)
  inputs:   mgContent
        mg/L magnesium in water
  outputs:
*/
function calcHardnessToEpsom(mgContent) {
  const unitConvertFactor = 3.785 / 1000;
  const mgToEpsomFactor = epsomChemWeight / mgChemWeight;
  var epsomContent = mgContent * unitConvertFactor * mgToEpsomFactor;
  epsomContent = Number(Number.parseFloat(epsomContent).toPrecision(3));
  return epsomContent;
}
/*
calcSodaToHardness(sodaWeight)
  inputs:   sodaWeight
        weight of baking soda to calculate bicarb content
  outputs: bicarbContent
        the grams bicarbonate content in a gallon of water
*/
function calcSodaToHardness(sodaWeight) {
  const unitConvertFactor = 1000 / 3.785;
  const sodaToBicarbFactor = bicarbChemWeight / sodaChemWeight;
  var bicarbContent = sodaWeight * unitConvertFactor * sodaToBicarbFactor;
  bicarbContent = Number(Number.parseFloat(bicarbContent).toPrecision(3));
  return bicarbContent;
}
/*
calcHardnessToSoda
  inputs:   bicarbContent
        amount of bicarbonate mg/L water
  outputs:  sodaToUse
        grams of baking soda to use to reach bicarbContent
*/
function calcHardnessToSoda(bicarbContent) {
  const unitConvertFactor = 3.785 / 1000;
  const bicarbToSodaFactor = sodaChemWeight / bicarbChemWeight;
  var sodaContent = bicarbContent * unitConvertFactor * bicarbToSodaFactor;
  sodaContent = Number(Number.parseFloat(sodaContent).toPrecision(3));
  return sodaContent;
}
/*
updateDisplays(calcType)
  inputs: none

  outpus: success
      returns true if function completes
*/
function updateDisplays() {
  mgContentDisplay.textContent = mgContent;
  gh = mgContent * CaCO3ChemWeight / mgChemWeight;
  gh = Number(Number.parseFloat(gh).toPrecision(3));
  ghDisplay.textContent = gh;
  bicarbContentDisplay.textContent = bicarbContent;
  kh = bicarbContent * CaCO3ChemWeight / bicarbChemWeight;
  kh = Number(Number.parseFloat(kh).toPrecision(3));
  khDisplay.textContent = kh;
  mgInput.value = mgContent;
  bicarbInput.value = bicarbContent;
  epsomToUse.textContent = epsomContent;
  sodaToUse.textContent = sodaContent;
  return true;
}
/*
validateInput(input)
    inputs: input
          any given input to be checked if it is a number
    outpus: convertedInput
          a copy of input, converted to 0 if input === NaN
*/
function validateInput(input) {
  var convertedInput = Number(input);
  if (Number.isNaN(convertedInput)) {
    alert("That is not a valid input");
    convertedInput = 0;
  }
  return convertedInput;
}
