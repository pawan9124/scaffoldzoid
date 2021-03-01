import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps, createMockStore } from "../../testUtils";
import RateGrid from "./index";
import renderer from "react-test-renderer";
import { withRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const props = {
  history: {},
  location: {},
  match: {},
  staticContext: undefined,
  rows: [],
};
const store = createMockStore({
  auth: { isAuthenticated: true, user: {} },
  errors: {},
  profile: { profiles: {}, allProfiles: [] },
  rates: { currentRate: {}, allRates: [] },
});

describe("Taking snap shot", () => {
  it("Taking the snapshot of the Component", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <RateGrid {...props} />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Checking the render of component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <RateGrid {...props} />
        </Router>
      </Provider>
    );
  });
  it("Should Render a component", () => {
    const component = findByTestAttr(wrapper, "RateGridComponent");
    expect(component.length).toBe(1);
  });
});

describe("Checking PropTypes", () => {
  it("Should Not throw a warning", () => {
    const expectedProps = props;

    const propsError = checkProps(RateGrid, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
