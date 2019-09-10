import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ServerButton from "./ServerButton";

Enzyme.configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = mount(<ServerButton {...props} />);
  return component;
};

describe("SERVER BUTTON", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("SHOULD RENDER WITH CUSTOM TEXT", () => {
    const button = component.find("button");
    expect(button).toHaveLength(1);
    expect(button.prop("type")).toEqual("submit");
    expect(button.text()).toEqual("•••");
  });

});
