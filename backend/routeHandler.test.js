const { postTweetHandler, authenticateHandler, getAllTweetsHandler } = require("./routeHandler");
const { createErr, reqWrapper } = require("./utility");

jest.mock("twitter");

const createMockRes = () => {
  const jsonMock = jest.fn();
  const statusMock = jest.fn(() => ({ json: jsonMock }));
  const resMock = {
    status: statusMock
  };
  return { jsonMock, statusMock, resMock };
};

describe("createErr tests", () => {
  test("createErr success", () => {
    expect(createErr("hello world", { status: 200 })).toStrictEqual({ message: "hello world", status: 200 });
    expect(createErr("hello world")).toStrictEqual({ message: "hello world" });
  });
});

describe("reqWrapper tests", () => {
  test("request success", () => {
    const reqMock = jest.fn(() => {});
    const { jsonMock, statusMock, resMock } = createMockRes();

    expect(reqMock.mock.calls.length).toBe(0);
    expect(statusMock.mock.calls.length).toBe(0);
    expect(jsonMock.mock.calls.length).toBe(0);
    expect(reqWrapper(resMock, reqMock));
    expect(reqMock.mock.calls.length).toBe(1);
    expect(statusMock.mock.calls.length).toBe(0);
    expect(jsonMock.mock.calls.length).toBe(0);
  });
  test("request failed", () => {
    const reqMock = jest.fn(() => {
      throw new Error();
    });
    const { jsonMock, statusMock, resMock } = createMockRes();

    expect(reqMock.mock.calls.length).toBe(0);
    expect(statusMock.mock.calls.length).toBe(0);
    expect(jsonMock.mock.calls.length).toBe(0);
    expect(reqWrapper(resMock, reqMock));
    expect(reqMock.mock.calls.length).toBe(1);
    expect(statusMock.mock.calls.length).toBe(1);
    expect(jsonMock.mock.calls.length).toBe(1);
  });
});

describe("authentication tests", () => {
  test("auth success", () => {
    const { jsonMock, statusMock, resMock } = createMockRes();
    const req = {
      body: {
        username: "admin1",
        password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
      }
    };
    authenticateHandler(req, resMock);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Success" });
  });
  test("auth missing username", () => {
    const { jsonMock, statusMock, resMock } = createMockRes();
    const req = {
      body: {
        password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
      }
    };
    authenticateHandler(req, resMock);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: "No username provided" });
  });
  test("auth missing password", () => {
    const { jsonMock, statusMock, resMock } = createMockRes();
    const req = {
      body: {
        username: "admin1"
      }
    };
    authenticateHandler(req, resMock);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: "No password provided" });
  });
  test("auth wrong password", () => {
    const { jsonMock, statusMock, resMock } = createMockRes();
    const req = {
      body: {
        username: "admin1",
        password: "wrong password"
      }
    };
    authenticateHandler(req, resMock);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Incorrect password" });
  });
  test("auth missing usr name", () => {
    const { jsonMock, statusMock, resMock } = createMockRes();
    const req = {
      body: {
        username: "admin2",
        password: "wrong password"
      }
    };
    authenticateHandler(req, resMock);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Username does not exist" });
  });
});
