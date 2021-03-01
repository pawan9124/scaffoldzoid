import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../testUtils";
import Modal from "./index";
import renderer from "react-test-renderer";

const props = {
  children: "<div>child</div>",
  handleOrangeEvent: jest.fn(),
  isOpen: true,
  setIsOpen: jest.fn(),
};

describe("Taking snap shot", () => {
  it("Taking the snapshot of the Component", () => {
    const tree = renderer.create(<Modal {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Checking the render of component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Modal {...props} />);
  });
  it("Should Render a component", () => {
    const button = findByTestAttr(wrapper, "ModalComponent");
    expect(button.length).toBe(1);
  });
});

describe("Checking PropTypes", () => {
  it("Should Not throw a warning", () => {
    const expectedProps = props;

    const propsError = checkProps(Modal, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
