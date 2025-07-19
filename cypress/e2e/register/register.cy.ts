import { RegisterPageObj } from "../../pagesObj/registerObj";
import { getEnvVariables } from "../../support/commands";
import { Commands } from "../../utils/commands";
import { filePath } from "../../utils/filepath/filepath";
let command = new Commands();
let registerObj = new RegisterPageObj();
let jsonfilepath = filePath;
describe("Register Module",{tags:["@register","@regression"]}, () => {
  beforeEach(() => {
    command.visit(getEnvVariables("base_url"));
  });
  it("Register", { tags: ["@smoke"] }, () => {
    registerObj.register(jsonfilepath.register);
  });
  it("Invalid Confirm Password", () => {
    registerObj.invalidConfirmPassord();
  });
  it("Verify the error message that appears when the form is submitted without any input", () => {
    registerObj.checkValidationMessageSubmitEmptyForm();
  });
  it("Verify that the form displays an appropriate message when an invalid email is entered.", () => {
    registerObj.invalidEmail();
  });
  it("Username Length Validation", () => {
    registerObj.usernameLengthValidation();
  });
  it("Password Length Validation", () => {
    registerObj.passwordLengthValidation();
  });
});
