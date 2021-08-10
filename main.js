const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const popUp = document.querySelector(".popup");

const checkPasswords = () => {
    if (pass.value !== pass2.value) {
        showError(pass2, "Hasła nie są takie same!");
    };
};


/*Funkcja sprawdza długość znaków w inpucie i w razie konieczności wyświetla odpowiednią wiadomość. Zawiera w sobie także funkcję showError*/
const checkLength = (input, min) => {
    if (input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków`);
    }
};

const showError = (input, msg) => {
    //input będzie przechowywał input
    // msg będzie przechowywał placeholder inputa - to wszystko w funkcji checkForm w pierwszym ifie

    const formbox = input.parentElement; //rodzic inputa
    formbox.classList.add("error");

    const errorMsg = formbox.querySelector(".error-text"); //paragraf z errorem
    errorMsg.textContent = msg; //treść placeholdera to treść wiadomości
};

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove("error");
};

/*Poniższa funckja będzie przyjmowała argument tablicy. Dla każdego elementu sprawdza, czy value jest równe pustemu stringowi*/
const checkForm = input => {
    input.forEach(el => {
        if (el.value === "") {
            showError(el, el.placeholder);
        } else {
            clearError(el);
        };
    });
};

//Poniżej funckja z wyrażeniem regularnym, sprawdzam email
const checkMail = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if (!reg.test(email.value)) {
        showError(email, "Niepoprawnie wpisany e-mail!");
     } else {
        clearError(email);
     };
};


//Iteruję po wszystkich formboxach, sprawdzam czy któryś ma klasę error - jeśli tak, to dodaję 1 do licznika
const checkErrors = () => {
    const formboxes = document.querySelectorAll(".form-box");
    let counter = 0;

    formboxes.forEach(el => {
        if (el.classList.contains("error")) {
            counter++;
        };
    });

    if (counter === 0) {
        popUp.classList.add("show-popup");
    };
};

/*Poniżej listener na sendBtn - preventDefault oraz wywołuję min. funkcję z argumentem tablicy*/
sendBtn.addEventListener("click", e => {
    e.preventDefault();
    checkForm([username, pass, pass2, email]);
    checkLength(username, 3);
    checkLength(pass, 8);
    checkPasswords();
    checkMail(email);
    checkErrors();
});

/*Poniżej listener na clearBtn - w pierwszej kolejności robię preventDefault, bo buttony w form mają z góry event, a później czyszczę formularz*/ 
clearBtn.addEventListener("click", e => {
    e.preventDefault();

    [username, pass, pass2, email].forEach(el => {
        el.value = "";
        clearError(el);
    });
});