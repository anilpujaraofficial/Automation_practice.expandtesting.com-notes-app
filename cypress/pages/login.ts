export class loginXpathAssertions {
  button(val) {
    return `[data-testid='${val}']`;
  }

  form(val) {
    return `input[name='${val}']`;
  }
  invalid_feedback() {
    return ".invalid-feedback";
  }
}
