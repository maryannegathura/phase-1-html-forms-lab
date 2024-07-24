// Import necessary dependencies
const chai = require("chai");
const chaiDom = require("chai-dom");

// Use chai-dom plugin
chai.use(chaiDom);

// Destructure chai's expect for cleaner usage
const { expect } = chai;

// Simulate a browser environment or use jsdom to have access to document object
const { JSDOM } = require("jsdom");
const fs = require("fs");

// Load the HTML file content
const html = fs.readFileSync("index.html", "utf-8");

// Set up a global document object using jsdom
const { document } = new JSDOM(html).window;
global.document = document;

// Require the helpers.js if needed
// require("./helpers.js");

// Describe the test suite for index.html
describe("index.html", () => {
  describe("the body", () => {
    it("contains a <form>", () => {
      const body = document.querySelector("body");

      const form = body.querySelector("form");
      expect(form).to.exist;
    });
  });

  describe("the form", () => {
    let form; // Declare form outside to make it accessible across tests

    // Before each test in this describe block, find the form element
    beforeEach(() => {
      form = document.querySelector("form");
    });

    it("contains a 'text' type <input> tag with an id of 'fullname' and placeholder equal to 'Enter Name'", () => {
      const input = form.querySelector('input[type="text"][id="fullname"]');
      expect(input).to.exist;
      expect(input).to.have.attribute("placeholder", "Enter Name");
      expect(input).to.have.attribute("required");
    });

    it("contains an 'email' type <input> tag with an id of 'email' and placeholder equal to 'Enter Email'", () => {
      const input = form.querySelector('input[type="email"][id="email"]');
      expect(input).to.exist;
      expect(input).to.have.attribute("placeholder", "Enter Email");
      expect(input).to.have.attribute("required");
    });

    it("contains a 'tel' type <input> tag with an id of 'phone' and placeholder equal to 'Enter Telephone (optional)'", () => {
      const input = form.querySelector('input[type="tel"][id="phone"]');
      expect(input).to.exist;
      expect(input).to.have.attribute("placeholder", "Enter Telephone (optional)");
    });

    it("contains <label> tags for the fullname, email, phone and message form inputs", () => {
      const labels = form.querySelectorAll("label");
      const inputs = form.querySelectorAll("input, textarea");

      expect(labels.length).to.equal(inputs.length);

      for (let i = 0; i < inputs.length; i++) {
        const inputId = inputs[i].getAttribute("id");
        const labelFor = labels[i].getAttribute("for");
        expect(labelFor).to.equal(inputId);
      }
    });

    it("contains a <textarea> tag with an id of 'message' and placeholder equal to 'Enter Message'", () => {
      const textarea = form.querySelector('textarea[id="message"]');
      expect(textarea).to.exist;
      expect(textarea).to.have.attribute("placeholder", "Enter Message");
    });

    it("contains a checkbox", () => {
      const checkbox = form.querySelector('input[type="checkbox"]');
      expect(checkbox).to.exist;
    });

    it("contains a submit type input", () => {
      const submit = form.querySelector('input[type="submit"]');
      expect(submit).to.exist;
    });
  });
});
