import App from "../App";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Tweet with prop should show correctly", async () => {
  const component = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(component).toMatchSnapshot();
});
