import { faker } from "@faker-js/faker";

export function register() {
  const password = faker.internet.password();
  const name = faker.person.fullName();
  let data = {
    email: {
      type: "input",
      value: name.replace(/\s+/g, "").toLowerCase() + "@mailinator.com",
    },
    password: {
      type: "input",
      value: password,
    },
    name: {
      type: "input",
      value: name,
    },
    confirmPassword: {
      type: "input",
      value: password,
    },
  };
  return data;
}

export function note() {
  let data = {
    category: {
      type: "select",
      value: faker.helpers.arrayElement(["Home", "Work", "Personal"]),
    },
    completed: {
      type: "checkbox",
      value: faker.datatype.boolean(),
    },
    title: {
      type: "input",
      value: faker.lorem.words(3).toUpperCase(),
    },
    description: {
      type: "input",
      value: faker.lorem.paragraph(),
    },
  };
  return data;
}
