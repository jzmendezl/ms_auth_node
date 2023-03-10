

export const validateEmail = (email) => {
    let expRegEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return expRegEmail.exec(email);
}

export const validateName = (name) => {
    let expRegName = /^[a-zA-Z0-9_-\s]{3,16}$/;
    return expRegName.exec(name);
}

export const validatePassword = (password) => {
    let expRegPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return expRegPassword.exec(password);
}