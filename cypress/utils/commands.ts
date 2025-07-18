/// <reference types="cypress" />
let xpath_alert = ".ant-notification-notice-description";

export class Commands {
  //form
  inputField(xpath: any, value: any) {
    cy.get(xpath)
      .clear({ force: true })
      .type(value, { force: true })
      .should("have.value", value)
      .wait(1000);
  }

  getData(xpath: string) {
    return cy
      .get(xpath)
      .click({ force: true })
      .invoke("val")
      .then((val) => {
        return val as string;
      });
  }

  getDropdownWithName(xpath: string, value: string) {
    cy.get(xpath)
      .clear({ force: true })
      .type(value, { force: true })
      .should("have.value", value)
      .wait(500);
    cy.get(`div[name='${value}']`).click();
  }
  getDropdownWithTitle(xpath: string, value: string) {
    cy.get(xpath)
      .clear({ force: true })
      .type(value, { force: true })
      .should("have.value", value)
      .wait(500);
    cy.get(`div[title='${value}']`).click();
  }
  getDropdownWithContent(xpath: string, value: string) {
    cy.get(xpath)
      .clear({ force: true })
      .type(value, { force: true })
      .should("have.value", value)
      .wait(500);
    cy.get(`div.ant-select-dropdown div.ant-select-item-option-content`)
      .contains(value)
      .click();
  }

  getDropdownWithEnter(xpath: string, value: string) {
    cy.get(xpath)
      .click({ force: true })
      .type(`${value}{enter}`, { force: true });
  }

  CKeditorInput(value: string) {
    cy.get(".ck-content[contenteditable=true]")
      .then((el) => {
        // @ts-ignore
        const editor = el[0].ckeditorInstance;
        editor.setData(value);
      })
      .wait(500);
  }
  // button

  verifyCKeditorContain(value: string) {
    cy.get(".ck-blurred p").should("contain", value);
  }
  clickButtonWithForceTrue(xpath: string) {
    cy.get(xpath).should("exist").click({ force: true }).wait(1000);
  }

  clickButton(xpath: string) {
    cy.get(xpath).should("exist").click().wait(500);
  }
  clickWithContain(xpath, value) {
    cy.get(xpath).contains(value).should("contain", value).click().wait(500);
  }
  clickWithContainFore(xpath, value) {
    cy.get(xpath)
      .contains(value)
      .should("contain", value)
      .click({ force: true })
      .wait(500);
  }
  clickCheckboxIfUnchecked(labelText: string) {
    cy.contains("label", labelText).within(() => {
      cy.get('input[type="checkbox"]').then(($checkbox) => {
        if (!$checkbox.is(":checked")) {
          cy.wrap($checkbox).click();
        }
      });
    });
  }

  archive(xpath: string, value: string) {
    cy.wait(500);
    this.ClickActions("Archive");
    cy.get("div.ant-popconfirm-message-text").should(
      "contain",
      "Are you sure you want to archive?"
    );
    cy.get(xpath).contains(value).click();
  }

  ClickActions(value) {
    cy.get(".ant-dropdown-menu-title-content")
      .and("exist")
      .contains(value)
      .should("contain", value)
      .click();
  }

  inputValueVerify(value) {
    cy.get(`input[value='${value}']`).should("exist");
  }
  clickSwitch(xpath: string, value: boolean) {
    cy.get(xpath)
      .should("be.visible")
      .and("exist")
      .then(($element) => {
        // Get the current state of the switch
        const currentState = $element.attr("aria-checked") === "true";

        // Check if the current state matches the desired state
        if (currentState !== value) {
          // Click the switch if the state does not match the desired state
          cy.wrap($element).should("exist").and("be.visible").click();
        }
      });
  }

  // table

  tableBody(xpath: any, value: any) {
    cy.get(xpath).should("contain", value);
  }

  tableEntry(xpath: any, index: any, value: any) {
    cy.get(xpath).eq(index).type(value);
  }

  tableCheckboxClick(xpath: any, index: any, shouldBeChecked: boolean) {
    cy.get(xpath)
      .eq(index)
      .then(($checkbox) => {
        const isChecked = $checkbox.is(":checked");

        if (shouldBeChecked && !isChecked) {
          cy.wrap($checkbox).click(); // Click if it should be checked but isn't
        } else if (!shouldBeChecked && isChecked) {
          cy.wrap($checkbox).click(); // Click if it should be unchecked but is
        }
      });
  }

  tableRowClick(xpath: any, value: any) {
    cy.get(xpath).contains(value).click();
  }

  tableBodySwitch(xpath: string, value: boolean) {
    cy.get(xpath).then(($element) => {
      const currentState = $element.attr("aria-checked") === "true";

      if (currentState === value) {
        cy.wrap($element).should("have.attr", "aria-checked", value.toString());
      } else {
        cy.wrap($element).should(
          "have.attr",
          "aria-checked",
          (!value).toString()
        );
      }
    });
  }
  //alert
  alertMessage(value: string) {
    cy.get(xpath_alert).should("contain", value).wait(500);
  }
  formValidation(xpath: string, value: string) {
    cy.get(xpath).should("contain", value);
  }
  //Verify
  verifyInputFieldValue(xpath, value) {
    cy.get(xpath).invoke("val").should("eq", value);
  }

  verifyCheckUncheck(xpath: string, value: string) {
    cy.get(xpath).then((res) => {
      expect(res.attr("aria-checked")).to.eq(value.toString());
    });
  }
  validateCheckboxStatus(labelText: string, shouldBeChecked: boolean) {
    cy.contains("label", labelText).within(() => {
      cy.get('input[type="checkbox"]').should(
        shouldBeChecked ? "be.checked" : "not.be.checked"
      );
    });
  }
  verifyUrl(url) {
    cy.url().should("contain", url);
  }

  verifySelectItem(value) {
    cy.get("div.ant-select-selector .ant-select-selection-item").should(
      "contain",
      value
    );
  }

  verifySelectDropDown(value) {
    cy.get(`div span[title='${value}']`).should("exist").and("be.visible");
  }

  verifyDisableDropdown(value: string) {
    cy.get(".ant-select-selector span.ant-select-selection-item ").should(
      "contain",
      value
    );
  }

  verifyCKeditorValue(value) {
    cy.get(`p`).should("contain", value).should("exist").and("be.visible");
  }

  capitalizeFirstLetter(val: any) {
    return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  }

  titleCase(val: any) {
    const stringArray = new String(val).split(" ");
    const reformattedStringArray = stringArray.map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    );
    return reformattedStringArray.join(" ");
  }
  verifyTableData(xpath, val) {
    cy.get(xpath).should("contain", val);
  }
  typeAndEnter(xpath, value) {
    cy.get(xpath).should("exist").clear().type(`${value} {enter}`).wait(500);
  }

  verifyContain(xpath, val) {
    cy.get(xpath)
      .contains(val)
      .and("contain", val)
      .should("be.visible")
      .and("exist");
  }

  selectPeriod(parameter) {
    if (parameter === "Period") {
    } else {
      this.getDropdownWithName("#period", parameter);
    }
  }

  /**
   *
   * @param data pagination data
   */
  pagination(data) {
    if (data.total == 15) {
      cy.get(".ant-pagination-total-text").should(
        "contain",
        `Showing ${data.from} to ${data.to} of ${data.total} entries`
      );
      cy.get("ul.ant-pagination li[title='Previous Page'] button").should(
        "be.disabled"
      );
      cy.get(`ul.ant-pagination li[title='${data.current_page}']`).should(
        "have.class",
        "ant-pagination-item-active"
      );
      cy.get("ul.ant-pagination li[title='Next Page'] button").should(
        "be.disabled"
      );
    } else if (data.total > 15) {
      cy.get(".ant-pagination-total-text").should(
        "contain",
        `Showing ${data.from} to ${data.to} of ${data.total} entries`
      );
      cy.get(`ul.ant-pagination li[title='${data.current_page}']`).should(
        "have.class",
        "ant-pagination-item-active"
      );
      cy.get("ul.ant-pagination li[title='Next Page'] button")
        .should("be.enabled")
        .click();
      cy.get("ul.ant-pagination li[title='2']").should(
        "have.class",
        "ant-pagination-item-active"
      );
      cy.get("ul.ant-pagination li[title='Previous Page'] button")
        .should("be.enabled")
        .click();
    } else {
      cy.log("No pagination found");
    }
  }
}
