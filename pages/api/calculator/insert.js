const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Not a POST request"});
    }
    const data = req.body;

    console.log("Posting: ");
    console.log(data);
    return res.status(200).json({message: "Inserted"});
}

export default handler;