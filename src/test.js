const { handler } = require("./index");

describe("basic tests", () => {
  test("handler function exists", () => {
    expect(typeof handler).toBe("function");
  });
});

describe("Search by full or partial zipcode", () => {
  test("Search by full success", async () => {
    const data = await handler({
      httpMethod: "POST",
      path: "/resouce",
      headers: {
        "content-type": "application/json"
      },
      body: '{"zip":"01001"}'
    });
    expect(data.length).toBe(1);
  });

  test("Search by full empty", async () => {
    const data = await handler({
      httpMethod: "POST",
      path: "/resouce",
      headers: {
        "content-type": "application/json"
      },
      body: '{"zip":"0100132"}'
    });
    expect(data.length).toBe(0);
  });

  test("Search by partial", async () => {
    const data = await handler({
      httpMethod: "POST",
      path: "/resouce",
      headers: {
        "content-type": "application/json"
      },
      body: '{"zip":"0100"}'
    });
    expect(data.length).toBe(8);
  });
});

describe("Search by full or partial city", () => {
  test("Search by full", async () => {
    const data = await handler({
      httpMethod: "POST",
      path: "/resouce",
      headers: {
        "content-type": "application/json"
      },
      body: '{"city":"Agawam"}'
    });
    expect(data.length).toBe(1);
  });

  test("Search by partial", async () => {
    const data = await handler({
      httpMethod: "POST",
      path: "/resouce",
      headers: {
        "content-type": "application/json"
      },
      body: '{"city":"chester"}'
    });
    expect(data.length).toBe(45);
  });
});
