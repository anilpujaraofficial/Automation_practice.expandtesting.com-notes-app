/// <reference types="cypress" />

import { loginXpathAssertions } from "../pages/login";
import { Commands } from "../utils/commands";
import { filePath } from "../utils/filepath/filepath";

let xpath = new loginXpathAssertions();
let jsonfilePath = filePath;
let commands = new Commands();
/**
 *
 * @param value
 * @returns
 */
export function getEnvVariables(value) {
  return Cypress.env(Cypress.env("testEnv"))[value];
}

Cypress.Commands.add("login", () => {
  cy.session("login", () => {
    cy.visit(getEnvVariables("base_url"));
    commands.clickWithContain(xpath.button("open-login-view"), "Login");
    commands.verifyUrl("/login");
    cy.readFile(jsonfilePath.register).then((data) => {
      for (const key in data) {
        if (key == "email" || key == "password") {
          commands.inputField(xpath.form(key), data[key].value);
        }
      }
      commands.clickButton(xpath.button("login-submit"));
      cy.wait(6000);
    });
    cy.visit(getEnvVariables("base_url"));
    cy.url().should("include", getEnvVariables("base_url"));
  });
});

// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      login(): Chainable<JQuery<HTMLElement>>;
    }
  }
}
