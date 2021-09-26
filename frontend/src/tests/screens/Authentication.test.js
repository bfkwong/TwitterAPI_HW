import Authentication from "../../screens/Authentication";
import { render } from "@testing-library/react";

test("Tweet with prop should show correctly", async () => {
  const setAuthMock = jest.fn();
  const component = render(<Authentication auth={false} setAuth={setAuthMock} />);

  expect(component).toMatchSnapshot();
});
