import { createVuetify } from "vuetify";

import { mount } from "@vue/test-utils";

import FormActions from "../FormActions.vue";

describe("FormActions", () => {
  const vuetify = createVuetify();

  it("should emit click:submit on submit button clicked", () => {
    const wrapper = mount(FormActions, {
      global: {
        plugins: [vuetify],
      },
    });

    wrapper.find(".v-btn").trigger("click");

    expect(wrapper.emitted("click:submit")).toHaveLength(1);
  });
  it("should emit click:cancel on submit button clicked", () => {
    const wrapper = mount(FormActions, {
      props: {
        enableCancel: true,
      },
      global: {
        plugins: [vuetify],
      },
    });

    wrapper.findAll(".v-btn")[1].trigger("click");

    expect(wrapper.emitted("click:cancel")).toHaveLength(1);
  });
});
