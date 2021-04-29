import dbConnect from "../../utils/dbConnect";
import Test from '../../models/Test'

export default async (req, res) => {
    await dbConnect();

    try {
        const test = await Test.find(req.query).sort({ failures: 1, answer_time: 1 })
        res.status(200).json({ success: true, data: test })
    } catch (error) {
        res.status(400).json({ success: false })
    }
};