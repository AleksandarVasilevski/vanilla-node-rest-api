const { getAll, getById, create, update, _delete } = require("./productModel");

test("getAll", async () => {
    expect(await getAll()).toEqual(
        expect.arrayContaining([expect.objectContaining({})])
    );
});

test("getById", async () => {
    expect(await getById("1")).toEqual(expect.objectContaining({}));
});
