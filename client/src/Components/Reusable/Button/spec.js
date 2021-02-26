import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../Utils";
import Button from "./index";
import renderer from "react-test-renderer";

describe("Button Component", () => {
  describe("Taking snap shot", () => {
    it("Taking the snapshot of the Button Component", () => {
      let mockFunc = jest.fn();
      const props = {
        buttonClass: "btn-primary",
        buttonLabel: "Test Action",
        onClick: mockFunc,
      };
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

  describe("Renders", () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        buttonClass: "btn-primary",
        buttonLabel: "Test Action",
        onClick: mockFunc,
      };

      wrapper = shallow(<Button {...props} />);
    });

    it("Should Render a button", () => {
      const button = findByTestAttr(wrapper, "buttonComponent");
      expect(button.length).toBe(1);
    });

    it("Should Emit callback on click event", () => {
      const button = findByTestAttr(wrapper, "buttonComponent");
      button.simulate("click");
      const callback = mockFunc.mock.calls.length;
      expect(callback).toBe(1);
    });
  });
});
