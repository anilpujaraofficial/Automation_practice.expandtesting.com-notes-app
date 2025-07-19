import { faker } from "@faker-js/faker";
import { registerXpathAssertions } from "../pages/register";
import { Commands } from "../utils/commands";
import { register } from "../utils/faker/faker";
let xpath = new registerXpathAssertions();
let command = new Commands();

export class RegisterPageObj {
  register(filepath) {
    let data = register();
    cy.task("checkFileExists", filepath).then((bool) => {
      if (!bool) {
        command.clickWithContain(
          xpath.button("open-register-view"),
          "Create an account"
        );
        command.verifyUrl("/register");
        for (const key in data) {
          command.inputField(xpath.form(key), data[key].value);
        }
        command.clickButton(xpath.button("register-submit"));
        command.alertMessage("User account created successfully");
        cy.writeFile(filepath, data);
      }
    });
  }
  invalidConfirmPassord() {
    let data = register();
    command.clickButton(xpath.button("open-register-view"));
    command.verifyUrl("/register");
    for (const key in data) {
      if (key == "confirmPassword") {
        command.inputField(
          xpath.form("confirmPassword"),
          data.password.value + "1"
        );
      } else {
        command.inputField(xpath.form(key), data[key].value);
      }
    }

    command.clickButton(xpath.button("register-submit"));
    command.verifyContain(xpath.invalid_feedback(), "Passwords don't match!");
  }
  checkValidationMessageSubmitEmptyForm() {
    let message = [
      "Email address is required",
      "User name is required",
      "Password is required",
      "Confirm Password is required",
    ];
    command.clickButton(xpath.button("open-register-view"));
    command.clickButton(xpath.button("register-submit"));
    message.forEach((item) => {
      command.verifyContain(xpath.invalid_feedback(), item);
    });
  }
  invalidEmail() {
    let data = register();
    command.clickButton(xpath.button("open-register-view"));
    command.verifyUrl("/register");
    for (const key in data) {
      if (key === "email") {
        command.inputField(xpath.form("email"), data.password.value);
      } else {
        command.inputField(xpath.form(key), data[key].value);
      }
    }
    command.clickButton(xpath.button("register-submit"));
    command.verifyContain(xpath.invalid_feedback(), "Email address is invalid");
  }
  usernameLengthValidation() {
    let data = register();
    command.clickButton(xpath.button("open-register-view"));
    command.verifyUrl("/register");
    for (const key in data) {
      if (key === "name") {
        command.inputField(xpath.form("name"), faker.string.alphanumeric(31));
      } else {
        command.inputField(xpath.form(key), data[key].value);
      }
    }
    command.clickButton(xpath.button("register-submit"));
    command.verifyContain(
      xpath.invalid_feedback(),
      "User name should be between 4 and 30 characters"
    );
  }
  passwordLengthValidation() {
    let data = register();
    command.clickButton(xpath.button("open-register-view"));
    command.verifyUrl("/register");
    for (const key in data) {
      if (key === "password" || key === "confirmPassword") {
        command.inputField(xpath.form(key), "123");
      } else {
        command.inputField(xpath.form(key), data[key].value);
      }
    }

    command.clickButton(xpath.button("register-submit"));
    command.verifyContain(
      xpath.invalid_feedback(),
      "Password should be between 6 and 30 characters"
    );
  }
}
