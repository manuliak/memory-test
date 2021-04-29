import dbConnect from "../../utils/dbConnect";
import Test from '../../models/Test'

export default async (req, res) => {
    const { method } = req

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const test = await Test.find(req.query).sort({
                    failures: 1,
                    answer_time: 1,
                    grid_size: 1,
                    buttons_count: 1,
                    time_to_remember: -1
                }) /* find all the data in our database */
                
                res.status(200).json({ success: true, data: test })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                let is_visible = false;

                const {
                    grid_size,
                    buttons_count,
                    time_to_remember,
                    failures,
                    answer_time,
                } = req.body;

                const activeResult = await Test.find({
                    grid_size,
                    buttons_count,
                    time_to_remember,
                    is_visible: true
                });
                
                if(activeResult && activeResult.length > 0) {
                    if(failures <= activeResult[0].failures && answer_time < activeResult[0].answer_time) {
                        is_visible = true;

                        await Test.findOneAndUpdate(
                            {
                                _id: activeResult[0]._id,   
                            },
                            {
                                is_visible: false
                            }
                        );
                    }
                } else {
                    is_visible = true;
                }

                const test = await Test.create(
                    {
                        ...req.body,
                        is_visible
                    }
                ) /* create a new model in the database */

                res.status(201).json({ success: true, data: test })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
};