import { ContactUs } from "../../models";

export const saveContactDetails = async(req, res) => {
    try {
        const {
            username,
            email,
            phoneNum,
            message,
        } = req.body;

        const response = await ContactUs.create({
            username,
            email,
            phoneNum,
            message,
        })

        return res.status(201).json(response);
    } catch (error) {
        throw new Error(error)
    }
};