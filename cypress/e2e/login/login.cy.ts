import { LoginPageObj } from "../../pagesObj/loginObj";
import { getEnvVariables } from "../../support/commands";
import { Commands } from "../../utils/commands";
import { filePath } from "../../utils/filepath/filepath";
let filepath = filePath;
let loginObj = new LoginPageObj();
let command = new Commands();
describe("Login Module", { tags: ["@login", "@regression"] }, () => {
  beforeEach(() => {
    command.visit(getEnvVariables("base_url"));
  });

  it("invalid Login", () => {
    loginObj.invalidLogin(filePath.register);
  });
  it("Invalid Email", () => {
    loginObj.invalidEmail(filePath.register);
  });
  it("To verify that the system correctly accepts or rejects passwords based on the minimum and maximum character length limits", () => {
    loginObj.passwordLengthValidation(filePath.register);
  });
  it("valid Login", { tags: ["@smoke"] }, () => {
    loginObj.validLogin(filePath.register);
  });
});
