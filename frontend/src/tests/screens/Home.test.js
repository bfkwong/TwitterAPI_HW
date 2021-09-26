import Home from "../../screens/Home";
import { render } from "@testing-library/react";

test("Tweet with prop should show correctly", async () => {
  const setAuthMock = jest.fn();
  const component = render(<Home auth={true} setAuth={setAuthMock} />);

  expect(component).toMatchSnapshot();
});
