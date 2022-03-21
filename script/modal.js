//Instruction Popup
function togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
}

// Wrong Equation Popup JS
function togglePopupWrong() {
    document.getElementById("popup-2").classList.toggle("active");
}

//Congratualation popup js
function togglePopupCongratualation() {
    document.getElementById("popup-3").classList.toggle("active");

}
//Loss popup js
function togglePopupLose() {
    document.getElementById("popup-4").classList.toggle("active");
    document.getElementById("equation").innerText = N1_val + " " + O1_val + " " + N2_val + " " + O2_val + " " + N3_val;
}

