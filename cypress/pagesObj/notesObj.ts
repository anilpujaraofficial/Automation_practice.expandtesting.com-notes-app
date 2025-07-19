import { NotesXpathAssertions } from "../pages/notes";
import { Commands } from "../utils/commands";
import { note } from "../utils/faker/faker";
let command = new Commands();
let xpath = new NotesXpathAssertions();
export class NotesObj {
  create(filePath) {
    let data = note();
    cy.task("checkFileExists", filePath).then((bool) => {
      if (!bool) {
        command.clickButton(xpath.button("add-new-note"));
        for (const key in data) {
          if (data[key].type == "input") {
            command.inputField(xpath.form(key), data[key].value);
          } else if (data[key].type == "select") {
            cy.get("select").select(data[key].value);
          } else if (data[key].type == "checkbox") {
            command.clickCheckbox(xpath.form(key));
          }
        }
        command.clickButton(xpath.button("note-submit"));
        cy.writeFile(filePath, data);
      }
    });
  }
  search(filePath) {
    cy.readFile(filePath).then((data) => {
      command.inputField(xpath.form("search-input"), data.title.value);
      command.clickButton(xpath.button("search-btn"));
      command.verifyContain(xpath.button("note-card-title"), data.title.value);
      command.verifyContain(
        xpath.button("note-card-description"),
        data.description.value
      );
    });
  }
  view(filePath) {
    this.search(filePath);
    command.clickButton(xpath.button("note-view"));
    cy.readFile(filePath).then((data) => {
      command.verifyContain(xpath.button("note-card-title"), data.title.value);
      command.verifyContain(
        xpath.button("note-card-description"),
        data.description.value
      );
      command.verifyCheckbox(xpath.button("toggle-note-switch"));
    });
  }
  update(filePath) {
    let data = note();
    this.search(filePath);
    command.clickButton(xpath.button("note-edit"));
    for (const key in data) {
      if (data[key].type == "input") {
        command.inputField(xpath.form(key), data[key].value);
      } else if (data[key].type == "select") {
        cy.get("select").select(data[key].value);
      } else if (data[key].type == "checkbox") {
        command.clickCheckbox(xpath.form(key));
      }
    }
    command.clickButton(xpath.button("note-submit"));
    cy.writeFile(filePath, data);
    this.search(filePath);
  }
  delete(filePath) {
    this.search(filePath);
    command.clickButton(xpath.button("note-delete"));
    command.clickButton(xpath.button("note-delete-confirm"));
  }
}
