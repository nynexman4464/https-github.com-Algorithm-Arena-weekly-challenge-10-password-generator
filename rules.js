function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

class Rule {
  passes(string) {
    return true;
  }
  render() {
    return document.createElement("span");
  }
}

class NotRule extends Rule {
  constructor(rule) {
    this.rule = rule;
  }
  passes(string) {
    !this.rule.passes(string);
  }
  render() {
    const span = document.createElement("span");
    span.innerText = "does not ";
    span.appendChild(this.rule.render());
    return span;
  }
}

class CharacterSetRule extends Rule {
  constructor(characterClass, label) {
    super();
    this.label = label;
    if (characterClass == "custom") {
      //todo
    }
    this.regex = new RegExp(characterClass);
  }
  passes(string) {
    string;
  }
  renders() {
    const div = document.createElement("span");
    div.innerText = this.label;
    return div;
  }
  static renderChooser(parent) {
    const template = document
      .getElementById("character-set-rule")
      .content.cloneNode(true);
    const select = template.querySelector("select");
    this.presets.map(([regexClass, label]) => {
      const option = document.createElement("option");
      option.value = regexClass;
      option.innerText = label;
      select.appendChild(option);
    });
    select.onchange = (evt) => {
      const input = parent.querySelector("input");
      const isCustom = evt.target.value === "custom";
      input.toggleAttribute("required", isCustom);
      input.classList.toggle("hidden", !isCustom);
    };
    return template;
  }
  static makeRule(form) {
    const z = form["character-set"];
    if (!form.reportValidity()) {
      return null;
    }
    return new this(z.value, z.innerText);
  }
  static presets = [
    ["[0-9]", "Number (0-9)"],
    ["[a-z]", "Lowercase letter (a-z)"],
    ["[A-Z]", "Uppercase letter (A-Z)"],
    ["[!-@[-`{-~]", "Special character (!#%& etc)"],
    ["[!@#$%&]", "Special character (!@#$%& only)"],
    ['["]', 'Quote (")'],
    ["[\"'`]", "Quotes (\"'`)"],
    ["[ ]", "Space"],
    ["custom", "Custom"],
  ];
}
