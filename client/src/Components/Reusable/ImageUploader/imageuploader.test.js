import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../testUtils";
import ImageUploader from "./index";
import renderer from "react-test-renderer";

const props = {
  setSentImageFiles: jest.fn(),
  setImageFiles: jest.fn(),
};

describe("Taking snap shot", () => {
  it("Taking the snapshot of the ImageUploader Component", () => {
    const tree = renderer.create(<ImageUploader {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Checking the render of ImageUploader", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ImageUploader {...props} />);
  });
  it("Should Render a ImageUploader", () => {
    const button = findByTestAttr(wrapper, "imageUploaderComponent");
    expect(button.length).toBe(1);
  });
});

describe("Checking PropTypes", () => {
  it("Should Not throw a warning", () => {
    const expectedProps = props;

    const propsError = checkProps(ImageUploader, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
