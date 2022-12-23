const form = document.getElementById("add-user");

const disableFields = (disabled) => {
    form.name.disabled = disabled;
    form.lastname.disabled = disabled;
    form.age.disabled = disabled;

    // Submit
    disabled
        ? form.lastElementChild.classList.remove("enabled")
        : form.lastElementChild.classList.add("enabled");
    form.lastElementChild.disabled = disabled;
};

const cleanFields = () => {
    form.name.value = "";
    form.lastname.value = "";
    form.age.value = "";
};

const TypeMessage = {
    success: 0,
    error: 1,
};

const showErrorMessage = (reason) => {
    // Simulate specific error depend of the code
    if (reason.code === 102) {
        alert(`${reason.description} => ${reason.parameterAffected}`);
    }

    if (reason.code === 101) {
        alert(`${reason.description}`);
    }

    if (reason.code === 103) {
        alert(`${reason.description} => ${reason.parameterAffected}`);
    }
};

const showMessage = (type, message, reason) => {
    switch (type) {
        case TypeMessage.error:
            showErrorMessage(reason);
            break;
        case TypeMessage.success:
            alert(message);
            break;
        default:
            return;
    }

    disableFields(false);
};

const manageResponse = (response) => {
    response.json().then((res) => {
        if (!res.success) {
            showMessage(TypeMessage.error, undefined, res.reason);
            disableFields(false);
            return;
        }

        showMessage(TypeMessage.success, res.msg);
        cleanFields();
    });
};

const manageError = (error) => {
    console.log(error);
    disableFields(false);
};

const areValidFields = () => {
    // Valid fields like not empty or only numbers, etc
    return false;
};

const onSubmitUser = (event) => {
    event.preventDefault();

    if (areValidFields()) return;

    disableFields(true);

    const user = {
        name: form.name.value,
        lastname: form.lastname.value,
        age: form.age.value,
    };

    console.log(JSON.stringify({ user }));

    fetch("/users/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
    })
        .then(manageResponse)
        .catch(manageError);
};

form.addEventListener("submit", onSubmitUser);
