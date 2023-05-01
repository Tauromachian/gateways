import { createVuetify } from "vuetify";

import { mount } from "@vue/test-utils";

import AppForm from "../AppForm.vue";

describe("AppForm", () => {
  const vuetify = createVuetify();

  it("should display the title passed thru the props", () => {
    const wrapper = mount(AppForm, {
      props: {
        title: "Gateway form",
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.text()).toContain("Gateway form");
  });
});
