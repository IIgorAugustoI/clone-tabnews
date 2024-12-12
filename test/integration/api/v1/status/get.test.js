test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  // console.log(responseBody);

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  // Checks version POSTGRES
  expect(responseBody.dependecies.database.version_pg).toEqual("16.6");

  // Checks the number of user connected
  expect(responseBody.dependecies.database.user_connected).toEqual(1);

  // Checks the max number of user connect supported
  expect(responseBody.dependecies.database.max_connections).toEqual(100);
});
