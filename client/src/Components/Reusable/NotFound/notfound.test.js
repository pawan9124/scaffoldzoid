import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../testUtils";
import NotFound from "./index";
import renderer from "react-test-renderer";

describe("Taking snap shot", () => {
  it("Taking the snapshot of the Component", () => {
    const tree = renderer.create(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Checking the render of component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });
  it("Should Render a component", () => {
    const button = findByTestAttr(wrapper, "NotFoundComponent");
    expect(button.length).toBe(1);
  });
});
