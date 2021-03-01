import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../testUtils";
import InputBox from "./index";
import renderer from "react-test-renderer";

const props = {
  errors: undefined,
  handleChange: jest.fn(),
  label: "Retype Password",
  name: "password",
  placeholder: "Please retype password",
  type: "password",
  value: "",
};

describe("Taking snap shot", () => {
  it("Taking the snapshot of the Component", () => {
    const tree = renderer.create(<InputBox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Checking the render of component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<InputBox {...props} />);
  });
  it("Should Render a component", () => {
    const button = findByTestAttr(wrapper, "inputBoxComponent");
    expect(button.length).toBe(1);
  });
});

describe("Checking PropTypes", () => {
  it("Should Not throw a warning", () => {
    const expectedProps = props;

    const propsError = checkProps(InputBox, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
