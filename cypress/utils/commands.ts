/// <reference types="cypress" />

export class Commands {
  //form
  visit(url) {
    cy.visit(url).wait(500);
    cy.url().should("include", url);
  }
  inputField(xpath: any, value: any) {
    cy.get(xpath)
      .clear({ force: true })
      .type(value, { force: true })
      .should("have.value", value)
      .wait(1000);
  }
  textareaField(xpath: any, value: any) {
    cy.get(xpath).clear().type(value).should("have.value", value);
  }
  alertMessage(value: string) {
    cy.get(".alert").should("contain", value).wait(500);
  }

  clickButton(xpath: string) {
    cy.get(xpath).should("exist").click().wait(500);
  }
  clickWithContain(xpath, value) {
    cy.get(xpath).contains(value).should("contain", value).click().wait(500);
  }
  verifyUrl(url) {
    cy.url().should("include", url);
  }
  clickCheckbox(xpath) {
    cy.get(xpath).then((res) => {
      if (!res[0].checked) {
        cy.get(xpath).check().should("be.checked").wait(500);
      }
    });
  }
  verifyContain(xpath, value) {
    cy.get(xpath).should("contain", value);
  }
  verifyCheckbox(xpath) {
    cy.get(xpath).then((res) => {
      if (res[0].checked) {
        cy.get(xpath).should("be.checked");
      } else {
        cy.get(xpath).should("not.be.checked");
      }
    });
  }
}
