import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../testUtils";
import Cards from "./index";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

const props = {
  user: { _id: "uijjikk#dsdf", username: "test_user" },
  avatar: "https://i.ibb.co/dkzZ2qr/selena.jpg",
  description: "This is demo test",
};

describe("Taking snap shot", () => {
  it("Taking the snapshot of the Card Component", () => {
    const tree = renderer
      .create(
        <Router>
          <Cards {...props} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Checking the render of card", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Cards {...props} />);
  });
  it("Should Render a card", () => {
    const button = findByTestAttr(wrapper, "cardComponent");
    expect(button.length).toBe(1);
  });
});

describe("Checking PropTypes", () => {
  it("Should Not throw a warning", () => {
    const expectedProps = props;

    const propsError = checkProps(Cards, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
