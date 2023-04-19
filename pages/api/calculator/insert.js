import { insert } from "@/lib/mongodb/calculator";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            console.log("Trying to post: ")
            const data = {
                ipAddress: req.body.ipAddress,
                equation: req.body.equation,
            }

            const result = await insert(data);
            if(error) throw new Error(error);

            return res.status(200).json({result});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} is not allowed`);
}

export default handler;