import Tweet from "../../components/Tweet";
import { fireEvent, render } from "@testing-library/react";

jest.mock("../../Requests.js", () => ({
  getAllTweets: () => true,
  postTweet: () => true,
  deleteTweet: () => true,
  authenticate: () => true
}));

test("Tweet with no props should render without failure", () => {
  const component = render(<Tweet />);
  expect(component).toMatchSnapshot();
});

test("Tweet with prop should show correctly", async () => {
  const onDeleteMock = jest.fn();
  const component = render(
    <Tweet
      onDelete={onDeleteMock}
      tweet={{ text: "Hello world", created_at: "9/3/2021", id_str: "12345", user: { screen_name: "@person" } }}
    />
  );
  expect(onDeleteMock.mock.calls.length).toBe(0);

  const deleteTweetBtn = component.container.querySelector("#dlt_tweet_12345");
  expect(deleteTweetBtn).toBeTruthy();
  await fireEvent.click(deleteTweetBtn);

  expect(onDeleteMock.mock.calls.length).toBe(1);

  expect(component).toMatchSnapshot();
});
