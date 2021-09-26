import Tweeting from "../../components/Tweeting";
import { fireEvent, render } from "@testing-library/react";

jest.mock("../../Requests.js", () => ({
  getAllTweets: () => true,
  postTweet: () => true,
  deleteTweet: () => true,
  authenticate: () => true
}));

test("Tweet with no props should render without failure", () => {
  const component = render(<Tweeting />);
  expect(component).toMatchSnapshot();
});

test("Tweet with prop should show correctly", async () => {
  const onTweetMock = jest.fn();
  const component = render(<Tweeting onTweet={onTweetMock} />);
  expect(onTweetMock.mock.calls.length).toBe(0);

  const tweetBtn = component.getByText("Tweet");
  expect(tweetBtn).toBeTruthy();
  await fireEvent.click(tweetBtn);

  expect(onTweetMock.mock.calls.length).toBe(1);

  expect(component).toMatchSnapshot();
});
