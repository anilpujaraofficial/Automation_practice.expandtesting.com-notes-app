import { NotesObj } from "../../pagesObj/notesObj";
import { filePath } from "../../utils/filepath/filepath";

let notesObj = new NotesObj();
let jsonfilePath = filePath;
describe("Notes Module", { tags: ["@notes", "@regression"] }, () => {
  beforeEach(() => {
    cy.login();
  });
  it("Create", () => {
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
