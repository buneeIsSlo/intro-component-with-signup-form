//* DOM elements
const allInputs = document.querySelectorAll("input");
const validateEmail = document.querySelector(".form__email");
const submitBtn = document.querySelector(".form__trial");

//* Variables
let [errBorder, errIcon] = ["2px solid rgb(255, 122, 122)", `url("images/icon-error.svg") no-repeat scroll 95% 50%`];
let [sucBorder, sucIcon] = ["2px solid hsl(154, 59%, 51%)", `url("images/icon-success.svg") no-repeat scroll 95% 50%`];
let emailRegExp = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;


const onSubmit = arr => {
    //* Loop through all inputs to find if any input is empty.
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].value === "") applyError(arr[i]); //* If input is empty, Applies the error styling.
    }

    if(!(emailRegExp.test(validateEmail.value))) applyError(validateEmail); //* Checks if the email is valid.
    else if(Array.from(arr).every(el => el.value !== "")) {
        arr.forEach(el => applySuccess(el));
        submitBtn.innerHTML = "TRIAL CLAIMED :)";
    }   //* If every input is not empty, Applies the success styling. 

}

//* Template function to change styling.
const change = (element, borderProperties, backgroundProperties, textDisplay) => {
    element.style.border = borderProperties;
    element.style.background  = backgroundProperties;
    element.nextElementSibling.style.display = textDisplay;
    element.style.transition = "all .3s";
}

//* Function to apply the error styling.
const applyError = inp => {
    change(inp, errBorder, errIcon, "block");
}

//* Function to apply the success styling.
const applySuccess = inp => {
    change(inp, sucBorder, sucIcon, "none");
}

//* Function to apply the original styling.
const originalFocus = inp => {
    change(inp, "", "none", "none");
}


//* Trial button Event listener.
submitBtn.addEventListener("click", e => {
    e.preventDefault();
    onSubmit(allInputs); //* Calls the on submit function.

    //* Form input Event listener for returning the original focus.
    allInputs.forEach(el => {
        if(el.style.border === errBorder) el.addEventListener("click", () => {
            originalFocus(el);
        });
    })
});




