export class NotesXpathAssertions {
  button(val) {
    return `[data-testid='${val}']`;
  }
  form(val) {
    return `#${val}`;
  }
}
