import { loginXpathAssertions } from "../pages/login";
import { Commands } from "../utils/commands";
let xpath = new loginXpathAssertions();
let command = new Commands();
export class LoginPageObj {
  validLogin(filePath) {
    command.clickWithContain(xpath.button("open-login-view"), "Login");
    command.verifyUrl("/login");
    cy.readFile(filePath).then((data) => {
      for (const key in data) {
        if (key == "email" || key == "password") {
          command.inputField(xpath.form(key), data[key].value);
        }
      }
      command.clickButton(xpath.button("login-submit"));
      cy.get('[data-testid="home"]').should("contain", "MyNotes");
    });
  }
  invalidLogin(filePath) {
    command.clickWithContain(xpath.button("open-login-view"), "Login");
    command.verifyUrl("/login");
    cy.readFile(filePath).then((data) => {
      for (const key in data) {
        if (key == "email") {
          command.inputField(xpath.form(key), data[key].value);
        } else if (key == "password") {
          command.inputField(xpath.form(key), data[key].value + "1");
        }
      }
      command.clickButton(xpath.button("login-submit"));
      command.verifyContain(
        ".toast-body",
        "Incorrect email address or password"
      );
    });
  }
  invalidEmail(filePath) {
    command.clickWithContain(xpath.button("open-login-view"), "Login");
    command.verifyUrl("/login");
    cy.readFile(filePath).then((data) => {
      for (const key in data) {
        if (key == "email") {
          command.inputField(
            xpath.form(key),
            data[key].value.replace(/@/g, "")
          );
        } else if (key == "password") {
          command.inputField(xpath.form(key), data[key].value + "1");
        }
      }
      command.clickButton(xpath.button("login-submit"));
      command.verifyContain(
        xpath.invalid_feedback(),
        "Email address is invalid"
      );
    });
  }
  passwordLengthValidation(filePath) {
    command.clickWithContain(xpath.button("open-login-view"), "Login");
    command.verifyUrl("/login");
    cy.readFile(filePath).then((data) => {
      for (const key in data) {
        if (key == "email") {
          command.inputField(xpath.form(key), data[key].value);
        } else if (key == "password") {
          command.inputField(xpath.form(key), "123");
        }
      }
      command.clickButton(xpath.button("login-submit"));
      command.verifyContain(
        xpath.invalid_feedback(),
        "Password should be between 6 and 30 characters"
      );
    });
  }
}
