import LocalHostCall from "./LocalHostCall";
import mockAxios from "axios";

it("CALLS AXIOS AND RETURNS A SERVER OBJECT", async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        id: 1,
        status: "OFFLINE",
        name: "New York"
      }
    })
  );
  const servers = await LocalHostCall("data");
  expect(servers).toEqual({ id: 1, name: "New York", status: "OFFLINE" });
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
