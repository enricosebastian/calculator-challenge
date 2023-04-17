import clientPromise from ".";

let client;
let db;
let users;

async function init() {
    if (db) return;

    try {
        client = await clientPromise;
        db = await client.db("sample_mflix");
        users = await db.collection("users");

    } catch (error) {
        throw new Error(error);
    }
}

;(async() => {
    await init();
})();

export async function getUsers() {
    try {
        if (!users) await init();
        const result = await users
            .find({})
            .limit(20)
            .map(user => ({...user, _id: user._id.toString()}))
            .toArray();

        return {users: result};
    } catch (error) {
        return {error: error};
    }
}

export async function addUser() {
    try {
        if (!users) await init();

        return await users.insertOne({
            name: "Ben Tennyson",
            email: "ben10@gmail.com",
            password: "passwordispassword",
        });
    } catch (error) {
        return {error: error};
    }
}