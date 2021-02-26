import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../Utils";
import InputBox from "./index";
import renderer from "react-test-renderer";

let mockFunc = jest.fn();
const props = {
  type: "email",
  placeholder: "Please enter your email",
  handleChange: mockFunc,
  name: "Email"
};

describe("InputBox Component", () => {
  describe("Taking SnapShot", () => {
    it("Taking the snapshot of the InputBox Component", () => {
      const tree = renderer.create(<InputBox {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const propsError = checkProps(InputBox, props);
      expect(propsError).toBeUndefined();
    });
  });

  describe("Checking the Rendering", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<InputBox {...props} />);
    });

    it("Should render an InputBox", () => {
      const inputBox = findByTestAttr(wrapper, "InputBoxComponent");
      expect(inputBox.length).toBe(1);
    });

    it("Should emit callback on inputChange", () => {
      const inputBox = findByTestAttr(wrapper, "InputBoxComponent");
      const event = { target: { name: "Email", value: "donald@onedot.com" } };
      inputBox.simulate("change", event);
      const callback = mockFunc.mock.calls.length;
      expect(callback).toBe(1);
    });
  });
});
