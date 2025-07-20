import { NotesObj } from "../../pagesObj/notesObj";
import { getEnvVariables } from "../../support/commands";
import { filePath } from "../../utils/filepath/filepath";

let notesObj = new NotesObj();
let jsonfilePath = filePath;
describe("Notes Module", { tags: ["@notes", "@regression"] }, () => {
  before(() => {
    cy.rmDir(jsonfilePath.note_dir);
  });
  beforeEach(() => {
    cy.login();
    cy.visit(getEnvVariables("base_url"));
  });
  it("Create", { tags: ["@smoke"] }, () => {
    notesObj.create(filePath.note);
  });
  it("Search", () => {
    notesObj.search(filePath.note);
  });
  it("View", () => {
    notesObj.view(filePath.note);
  });
  it("Update", () => {
    notesObj.update(filePath.note);
  });
  it("Delete", () => {
    notesObj.delete(filePath.note);
  });
});
