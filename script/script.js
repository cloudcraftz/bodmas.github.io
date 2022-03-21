
var NextBoxId = "#N1";
var PrevBoxId;
var NextClass = ".box";

var count_button_press = 0;

var id_of_N1 = "N1";
var id_of_N2 = "N2";
var id_of_N3 = "N3";

var id_of_O1 = "O1";
var id_of_O2 = "O2";

var when_all_box_background_color_is_green=0;
// Checks next row visited or not
var nextRow = 0;

// counts visited TextBoxes in a current row (total five TextBoxes in a Row)
var button_clicked_five_times_or_not = 0;

// counts total visited TextBoxes
var count_visited_boxes = 0;

var regx_for_numbers = /[0-9]/;
var regx_for_operators = /[-X\+/]/;


// Function to toggle B/W Light/Dark theme
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}


//#region Physical Keyboard input Section 

// ===========================================Physical Keyboard input Section ===========================================


// This function takes care the inputs given from the Physical keyboard
$(document).keydown(function (event) {

    

    let key_val;

    if (event.key == '*')
        key_val = "X";
    else
        key_val = event.key;

    // Forcing user to enter 0-9 or (+ - X /). Other characters should avoided    
    if ((regx_for_numbers.test(key_val) || regx_for_operators.test(key_val)) &&
        button_clicked_five_times_or_not < 5 && when_all_box_background_color_is_green==0) {

        button_clicked_five_times_or_not += 1;

        $(NextBoxId).val(key_val);

        PrevBoxId = NextBoxId;

        $(NextBoxId).next(NextClass).focus();

        NextBoxId = "#" + document.activeElement.id;
    }

    // This code handles when the user presses 'Backspace' button 
    if (event.key == 'Backspace') {

        if (button_clicked_five_times_or_not > 0) {
            button_clicked_five_times_or_not -= 1;

            $(PrevBoxId).val("");

            NextBoxId = PrevBoxId;

            $(NextBoxId).prev(NextClass).focus();

            PrevBoxId = "#" + document.activeElement.id;
        }
    }

    // This key handles when user enters 'Enter' button
    if (event.key == 'Enter') {

        if (button_clicked_five_times_or_not == 5) {

            fun();
        }
        else if (button_clicked_five_times_or_not > 0)
            togglePopupWrong();
    }

});

//#endregion




//#region On-Screen Keyboard Input Section 

// ===================================== On-Screen Keyboard Input Section =================================================

$(document).ready(function () {

    // Function to get the focus of the next TextBox while pressing the number pad 
    $(".button").click(function () {

        if (NextBoxId != null && button_clicked_five_times_or_not < 5 && when_all_box_background_color_is_green==0) {

            button_clicked_five_times_or_not += 1;
           
            var temp = "#" + this.id;
           
         
            $(NextBoxId).val($(temp).val());

            PrevBoxId = NextBoxId;

            $(NextBoxId).next(NextClass).focus();
           
            if (document.activeElement.id != "")
                NextBoxId = "#" + document.activeElement.id;
            else
                NextBoxId = null;
        }
    });

    // Function to erase data from the TextBox
    $(".clr-btn").click(function () {


        if (PrevBoxId != null && button_clicked_five_times_or_not > 0) {

            button_clicked_five_times_or_not -= 1;

            $(PrevBoxId).val("");

            NextBoxId = PrevBoxId;

            $(NextBoxId).prev(NextClass).focus();

            if (document.activeElement.id != "clear")
                PrevBoxId = "#" + document.activeElement.id;
            else
                PrevBoxId = null;
        }
    });

    $(".next").click(function () {

        location.reload();
    });

    // This code shows the equation result on the screen
    document.getElementById('N4').value=document.getElementById('N4_2').value=document.getElementById('N4_3').value=answer;


});


//#endregion



//#region Map declaration 
// ================================ Map declaration =========================================================

const myMap = new Map();

var operators_array = ['+', '-', '/', 'X'];

// Storing the frequency of numbers and operators entered        
myMap.set("0", 0)
myMap.set("1", 0)
myMap.set("2", 0)
myMap.set("3", 0)
myMap.set("4", 0)
myMap.set("5", 0)
myMap.set("6", 0)
myMap.set("7", 0)
myMap.set("8", 0)
myMap.set("9", 0)
myMap.set("+", 0)
myMap.set("-", 0)
myMap.set("X", 0)
myMap.set("/", 0)

//#endregion


//#region Fraction Taken care section (Soution should not be in fraction) 

// ======================================= Fraction Taken care section(Soution should not be in fraction) =================================================

//N1 : user input TextBox for number
var N1_val;

N1_val = Math.floor(Math.random() * 10).toString();

//N2 : user input TextBox for number
let num_val;
var N2_val;

var N3_val;

//O1 : user input TextBox for operator
var O1_val;
O1_val = operators_array[Math.floor(Math.random() * 4)];

//O2 : user input TextBox for operator
var O2_val;

O2_val = operators_array[Math.floor(Math.random() * 4)];

var result_of_div;


// This code handles if the operator is '/'. Then the solution of the equation should not result in a fraction.
if (O1_val == "/") {

   
    // for operator '/'
    while (1) {

        num_val = Math.floor(Math.random() * 10);

        if (num_val == 0)
            num_val = 1;

        // Keeps checking untill suitable value is found that does not results  in a fraction    
        if (parseInt(N1_val) % num_val == 0) {

            result_of_div = parseInt(N1_val) / num_val;
            N2_val = num_val.toString();
            break;
        }
    }
}
else {

    // for Other operators : + , - , * 
    num_val = Math.floor(Math.random() * 10);
    if (num_val > 0)
        N2_val = num_val.toString();
    else
        N2_val = (num_val + 1).toString();
}



if (O2_val == "/") {

    
    // if the both the operators are '/'. Then solution of the equation should result in fraction 
    if (O1_val == "/") {

        num_val = Math.floor(Math.random() * 10);

        if (result_of_div % num_val == 0)
            N3_val = num_val.toString();
        else {

            // handles when (N1/N2)/N3 results in a fraction
            while (1) {

                num_val = Math.floor(Math.random() * 10);

                if (num_val == 0)
                    num_val = 1;

                // Keeps checking untill suitable value is found that does not results  in a fraction    
                if (result_of_div % num_val == 0) {
                    N3_val = num_val.toString();
                    break;
                }
            }
        }

    }
    else {
        // for only when O2 is '/'  
        while (1) {

            num_val = Math.floor(Math.random() * 10);

            if (num_val == 0)
                num_val = 1;

            // Keeps checking untill suitable value is found that does not results  in a fraction    
            if (parseInt(N2_val) % num_val == 0) {
                N3_val = num_val.toString();
                break;
            }
        }
    }
}
else {

    // for Other operators : + , - , * 
    num_val = Math.floor(Math.random() * 10);
    if (num_val > 0)
        N3_val = num_val.toString();
    else
        N3_val = (num_val + 1).toString();
}

//#endregion

//#region Double Digit Taken Care Section

// ===================================== Double Digit Taken Care Section =================================================

// This code handles that the solution of the equation should lie between the range 0-99 .

if (O1_val == "X" && O2_val == "X") {

    if (N1_val >= 5 && N2_val >= 5) {

        O1_val = operators_array[Math.floor(Math.random() * 2)];  
    }
    else if (N2_val >= 5 && N3_val >= 5) {

        O2_val = operators_array[Math.floor(Math.random() * 2)]; 
    }
    else if (N1_val >= 5 && N3_val >= 5) {

        let temp_num = Math.floor(Math.random() * 2)

        if (temp_num == 0)
            O1_val = operators_array[Math.floor(Math.random() * 2)];
        else
            O2_val = operators_array[Math.floor(Math.random() * 2)];
    }
    else if(parseInt(N1_val) * parseInt(N2_val) * parseInt(N3_val)  >= 100){
        
        let temp_num = Math.floor(Math.random() * 2)

        if (temp_num == 0)
            O1_val = operators_array[Math.floor(Math.random() * 2)];
        else
            O2_val = operators_array[Math.floor(Math.random() * 2)];

    }
}

//#endregion

//#region Handles that the Solution should not be a negative one


if (O1_val == "-" && O2_val == "+") {

    
    let res = parseInt(N1_val) - parseInt(N2_val);

    if ((res + parseInt(N3_val)) < 0) {

        let temp_num = Math.floor(Math.random() * 2)

        if (temp_num == 0)
            O1_val = "+";
        else
            O1_val = "X";
    }
}   
else if (O1_val == "+" && O2_val == "-") {

    
    let res = parseInt(N1_val) + parseInt(N2_val);

    if ((res - parseInt(N3_val)) < 0) {

        let temp_num = Math.floor(Math.random() * 2)

        if (temp_num == 0)
            O2_val = "+";
        else
            O2_val = "X";
    }
}
else if (O1_val == "-" && (O2_val == "X" || O2_val == "/")) {

    
    let res;
    if (O2_val == "X") {
        res = parseInt(N2_val) * parseInt(N3_val);
    }
    else if (O2_val == "/") {
        res = parseInt(N2_val) / parseInt(N3_val);
    }

    if ((parseInt(N1_val) - res) < 0) {

        
            O1_val = "+";
        
    }
}
else if ((O1_val == "X" || O1_val == "/") && O2_val == "-") {

    
    let res;
    if (O1_val == "X") {
        res = parseInt(N1_val) * parseInt(N2_val);
    }
    else if (O1_val == "/") {
        res = parseInt(N1_val) / parseInt(N2_val);
    }

    if ((res - parseInt(N3_val)) < 0) {

        let temp_num = Math.floor(Math.random() * 2)

        if (temp_num == 0)
            O2_val = "+";
        else 
            O2_val = "X";
    }
}
else if (O1_val == "-" && O2_val == "-") {

  
    let res = parseInt(N1_val) - parseInt(N2_val);

    if (res < 0) {

        let temp_num = Math.floor(Math.random() * 2)

        if (temp_num == 0)
            O1_val = "+";
        else
            O1_val = "X";


        if (O1_val == "+") {
            res = parseInt(N1_val) + parseInt(N2_val);
        }
        else if (O2_val == "X") {
            res = parseInt(N1_val) * parseInt(N1_val);
        }

        if ((res - parseInt(N3_val)) < 0) {

            temp_num = Math.floor(Math.random() * 2)

            if (temp_num == 0)
                O2_val = "+";
            else
                O2_val = "X";

        }
    }
    else if (res - parseInt(N3_val) < 0) {

            O2_val = "+";
    }
}


//#endregion

//#region Main Funtion (Color handling Section)

// =========================================  Main Funtion (Color handling Section) ====================================
if (O1_val == "X")
    O1_val = "*"
if (O2_val == "X")
    O2_val = "*"
  
// determining the result of the Equation which the user have to solve.    
infix = [N1_val, O1_val, N2_val, O2_val, N3_val];

var postfix = convertToPostfix(infix);
var answer = postfix_evaluation(postfix);



if (O1_val == "*")
    O1_val = "X"
if (O2_val == "*")
    O2_val = "X"


// Setting the frequency of the equaion which user has to solve    
//N1
let old_val = myMap.get(N1_val);
myMap.set(N1_val, old_val + 1);

//N2
old_val = myMap.get(N2_val);
myMap.set(N2_val, old_val + 1);

//N3
old_val = myMap.get(N3_val);
myMap.set(N3_val, old_val + 1);

//O1
old_val = myMap.get(O1_val);
myMap.set(O1_val, old_val + 1);

//O2
old_val = myMap.get(O2_val);
myMap.set(O2_val, old_val + 1);

var color_green = 'rgb(106, 170, 100)';
var color_yellow = 'rgb(201, 180, 88)';
var color_red = 'rgb(236, 59, 59)';


// Function to change the color of the TextBoxes to a specific color ,after entering all the values in the
//  in the TextBoxes by the user

function fun() {



    if (button_clicked_five_times_or_not == 5) {

        // Local Map
        let localMap = new Map(myMap);
        let frequency_counter;

        let isColorSet_For_N1 = false;
        let isColorSet_For_N2 = false;
        let isColorSet_For_N3 = false;
        let isColorSet_For_O1 = false;
        let isColorSet_For_O2 = false;


        let local_Id_of_N1 = document.getElementById(id_of_N1);
        let local_Id_of_N2 = document.getElementById(id_of_N2);
        let local_Id_of_N3 = document.getElementById(id_of_N3);

        let local_Id_of_O1 = document.getElementById(id_of_O1)
        let local_Id_of_O2 = document.getElementById(id_of_O2)

        //Checks for wether a user has entered a valid equation or not
        //valid equation : 2 + 3  X 5
        // Invalid equation + 2 X 3 6

        if (regx_for_operators.test(local_Id_of_N1.value) == true)
            togglePopupWrong();
        else if (regx_for_operators.test(local_Id_of_N2.value) == true)
            togglePopupWrong();
        else if (regx_for_operators.test(local_Id_of_N3.value) == true)
            togglePopupWrong();
        else if (regx_for_numbers.test(local_Id_of_O1.value) == true)
            togglePopupWrong();
        else if (regx_for_numbers.test(local_Id_of_O2.value) == true)
            togglePopupWrong();
        else {

           if (local_Id_of_O1.value == "X")
                local_Id_of_O1.value = "*"
           if (local_Id_of_O2.value == "X")
                local_Id_of_O2.value = "*"

            infix = [local_Id_of_N1.value, local_Id_of_O1.value, local_Id_of_N2.value, local_Id_of_O2.value, local_Id_of_N3.value];
            
            let postfix_result = convertToPostfix(infix);
            let expression_answer = postfix_evaluation(postfix_result);

            
            if (local_Id_of_O1.value == "*")
                local_Id_of_O1.value = "X"
            if (local_Id_of_O2.value == "*")
                local_Id_of_O2.value = "X"


            if(expression_answer!=answer){
                var snackbar_id = document.getElementById("snackbar");
                snackbar_id.className="show";
                setTimeout(function(){ snackbar_id.className = snackbar_id.className.replace("show", ""); }, 3000);
            }
            else{

             // For Color_Green
            //N1
            // Condition for the text box N1 (first textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green

            if (localMap.get(local_Id_of_N1.value) > 0 && local_Id_of_N1.value == N1_val) {

                document.getElementById(local_Id_of_N1.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_N1.value);
                localMap.set(local_Id_of_N1.value, frequency_counter - 1);
                count_visited_boxes += 1;
                isColorSet_For_N1 = true;
            }

            // N2
            // Condition for the text box N2 (Third textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green
            
            if (localMap.get(local_Id_of_N2.value) > 0 && local_Id_of_N2.value == N2_val) {

                document.getElementById(local_Id_of_N2.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_N2.value);
                localMap.set(local_Id_of_N2.value, frequency_counter - 1);
                count_visited_boxes += 1;
                isColorSet_For_N2 = true;
            }

            //N3   
            // Condition for the text box N3 (Fifth textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green

            if (localMap.get(local_Id_of_N3.value) > 0 && local_Id_of_N3.value == N3_val) {


                document.getElementById(local_Id_of_N3.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_N3.value);
                localMap.set(local_Id_of_N3.value, frequency_counter - 1);
                nextRow = 1;
                count_visited_boxes += 1;
                isColorSet_For_N3 = true;
            }

            //O1   
            // Condition for the text box O1 (second textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green

            if (localMap.get(local_Id_of_O1.value) > 0 && local_Id_of_O1.value == O1_val) {

                document.getElementById(local_Id_of_O1.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_O1.value);
                localMap.set(local_Id_of_O1.value, frequency_counter - 1);
                count_visited_boxes += 1;
                isColorSet_For_O1 = true;
            }

            //O2   
            // Condition for the text box O2 (Fourth textbox) : If input value exists in the Equation and placed 
            //correctly in the equation, Background Color will be green     

            if (localMap.get(local_Id_of_O2.value) > 0 && local_Id_of_O2.value == O2_val) {

                document.getElementById(local_Id_of_O2.id).style.backgroundColor = color_green;
                frequency_counter = localMap.get(local_Id_of_O2.value);
                localMap.set(local_Id_of_O2.value, frequency_counter - 1);
                count_visited_boxes += 1;
                isColorSet_For_O2 = true;
            }           

            
            // For Color_Yellow
            //N1
            if (localMap.get(local_Id_of_N1.value) > 0 && local_Id_of_N1.value != N1_val && isColorSet_For_N1==false) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow

                document.getElementById(local_Id_of_N1.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_N1.value);
                localMap.set(local_Id_of_N1.value, frequency_counter - 1);
                count_visited_boxes += 1;
                isColorSet_For_N1 = true;
            }
            //N2
            if (localMap.get(local_Id_of_N2.value) > 0 && local_Id_of_N2.value != N2_val && isColorSet_For_N2 == false) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow
                document.getElementById(local_Id_of_N2.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_N2.value);
                localMap.set(local_Id_of_N2.value, frequency_counter - 1);
                count_visited_boxes += 1;
                isColorSet_For_N2 = true;
            }
            //N3
            
            if (localMap.get(local_Id_of_N3.value) > 0 && local_Id_of_N3.value != N3_val && isColorSet_For_N3 ==false) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow
                document.getElementById(local_Id_of_N3.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_N3.value);
                localMap.set(local_Id_of_N3.value, frequency_counter - 1);
                nextRow = 1;
                count_visited_boxes += 1;
                isColorSet_For_N3 = true;
            }
            //O1
            if (localMap.get(local_Id_of_O1.value) > 0 && local_Id_of_O1.value != O1_val && isColorSet_For_O1 == false) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow
                document.getElementById(local_Id_of_O1.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_O1.value);
                localMap.set(local_Id_of_O1.value, frequency_counter - 1);
                count_visited_boxes += 1;
                isColorSet_For_O1 =true;
            }
            //O2
            if (localMap.get(local_Id_of_O2.value) > 0 && local_Id_of_O2.value != O2_val && isColorSet_For_O2 == false) {

                //If input value exists in the Equation and placed 
                //incorrectly in the equation, Background Color will be yellow
                document.getElementById(local_Id_of_O2.id).style.backgroundColor = color_yellow;
                frequency_counter = localMap.get(local_Id_of_O2.value);
                localMap.set(local_Id_of_O2.value, frequency_counter - 1);
                count_visited_boxes += 1;
                isColorSet_For_O2=true;
            }


            // For Color_Red
            // N1
            if (localMap.get(local_Id_of_N1.value) == 0 && isColorSet_For_N1 == false) {

                //If input value does not exists in the Equation then Background Color will be Red
                document.getElementById(local_Id_of_N1.id).style.backgroundColor = color_red;
                count_visited_boxes += 1;
            }
            //N2
            if (localMap.get(local_Id_of_N2.value) == 0 && isColorSet_For_N2 == false) {

                //If input value does not exists in the Equation then Background Color will be Red
                document.getElementById(local_Id_of_N2.id).style.backgroundColor = color_red;
                count_visited_boxes += 1;
            }
            //N3
            if (localMap.get(local_Id_of_N3.value) == 0 && isColorSet_For_N3 == false) {

                document.getElementById(local_Id_of_N3.id).style.backgroundColor = color_red;
                nextRow = 1;
                count_visited_boxes += 1;
            }
            //O1
            if (localMap.get(local_Id_of_O1.value) == 0 && isColorSet_For_O1 == false) {

                //If input value does not exists in the Equation then Background Color will be Red
                document.getElementById(local_Id_of_O1.id).style.backgroundColor = color_red;
                count_visited_boxes += 1;
            }

            // O2
            if (localMap.get(local_Id_of_O2.value) == 0 && isColorSet_For_O2 == false) {

                //If input value does not exists in the Equation then Background Color will be Red
                document.getElementById(local_Id_of_O2.id).style.backgroundColor = color_red;
                count_visited_boxes += 1;
            }



            if (count_button_press == 0 && nextRow == 1) {

                NextBoxId = "#N1_2";
                PrevBoxId = null;
                NextClass = ".box2";

                id_of_N1 = "N1_2";
                id_of_N2 = "N2_2";
                id_of_N3 = "N3_2";

                id_of_O1 = "O1_2";
                id_of_O2 = "O2_2";

                count_button_press += 1;
                nextRow = 0;
                button_clicked_five_times_or_not = 0;

            } else if (count_button_press == 1 && nextRow == 1) {

                NextBoxId = "#N1_3";
                PrevBoxId = null;

                NextClass = ".box3";


                id_of_N1 = "N1_3";
                id_of_N2 = "N2_3";
                id_of_N3 = "N3_3";

                id_of_O1 = "O1_3";
                id_of_O2 = "O2_3";

                count_button_press += 1;
                nextRow = 0;
                button_clicked_five_times_or_not = 0;
            }
            else
                PrevBoxId = null;


            if (local_Id_of_N1.style.backgroundColor == color_green &&
                local_Id_of_N2.style.backgroundColor == color_green &&
                local_Id_of_N3.style.backgroundColor == color_green &&
                local_Id_of_O1.style.backgroundColor == color_green &&
                local_Id_of_O2.style.backgroundColor == color_green) {

                when_all_box_background_color_is_green=1;    
               
                setTimeout(togglePopupCongratualation,500);
            }
            else if (count_visited_boxes == 15) {
                setTimeout(togglePopupLose,500);

            }
            }
        }
    } else if (button_clicked_five_times_or_not > 0) {
        togglePopupWrong();
    }
}

//#endregion