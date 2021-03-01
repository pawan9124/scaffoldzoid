import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../testUtils";
import Button from "./index";
import renderer from "react-test-renderer";

let mockFunc = jest.fn();
const props = {
  buttonClass: "btn-primary",
  buttonLabel: "Test Action",
  onClick: mockFunc,
};

describe("Taking snap shot", () => {
  it("Taking the snapshot of the Button Component", () => {
    const tree = renderer.create(<Button {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Checking PropTypes", () => {
  it("Should Not throw a warning", () => {
    const expectedProps = {
      buttonClass: "btn-primary",
      buttonLabel: "Test Action",
      onClick: () => {},
    };

    const propsError = checkProps(Button, expectedProps);
    expect(propsError).toBeUndefined();
  });
});

describe("Checking the render of button", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Button {...props} />);
  });
  it("Should Render a button", () => {
    const button = findByTestAttr(wrapper, "buttonComponent");
    expect(button.length).toBe(1);
  });
});
