import { get } from "@/lib/mongodb/calculator";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const ipAddress = req.body.ipAddress;
            const {calculatorHistory, error} = await get(ipAddress);
            if(error) throw new Error(error);

            return res.status(200).json({calculatorHistory});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} is not allowed`);
}

export default handler;