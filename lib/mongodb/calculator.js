import clientPromise from ".";

let client;
let db;
let calculatorHistory;

async function init() {
    if (db) return;

    try {
        client = await clientPromise;
        db = await client.db("calculator_app");
        calculatorHistory = await db.collection("calculator_history");

    } catch (error) {
        throw new Error(error);
    }
}

;(async() => {
    await init();
})();

export async function insert(data) {
    try {
        if (!calculatorHistory) await init();

        return await calculatorHistory.insertOne({
            ipAddress: data.ipAddress,
            equation: data.equation,
        });
    } catch (error) {
        return {error: error};
    }
}

export async function get(ipAddress) {
    try {
        if (!calculatorHistory) await init();
        const result = await calculatorHistory
            .find({ipAddress: ipAddress})
            .map(history => ({...history, _id: history._id.toString()}))
            .toArray();
        
        return {calculatorHistory: result};
    } catch (error) {
        return {error: error};
    }
}

export async function getAll() {
    try {
        if (!calculatorHistory) await init();
        const result = await calculatorHistory
            .find({})
            .limit(20)
            .map(history => ({...history, _id: history._id.toString()}))
            .toArray();
        
        return {calculatorHistory: result};
    } catch (error) {
        return {error: error};
    }
}

export async function deleteAll(ipAddress) {
    try {
        if (!calculatorHistory) await init();

        return await calculatorHistory.deleteMany({
            ipAddress: data.ipAddress
        });
    } catch (error) {
        return {error: error};
    }
}