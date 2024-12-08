import { Medicine } from "../models/medicine.model.js"

export const getAllMedicines = async (req, res) => {
    try {


        const medicines = await Medicine.find({
            image_url: { $exists: true, $ne: [], $not: { $size: 0 } }
        });

        return res.status(200).json(medicines);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// export const searchMedicines = async (req, res) => {
//     try {
//         const { searchQuery } = req.query;
//         if (!searchQuery || searchQuery.trim() === "") {
//             return res.status(400).json({ message: "Please provide query" });
//         }

//         const medicines = await Medicine.find({
//             $or: [
//                 { name: { $regex: searchQuery, $options: "i" } },
//                 { salt_composition: { $regex: searchQuery, $options: "i" } },
//                 { introduction: { $regex: searchQuery, $options: "i" } }
//             ]
//         });
//         if (!medicines) return res.status(404).json({ message: "Medicine not found" });
//         return res.status(200).json(medicines);

//     } catch (error) {
//         console.error("Error searching medicines:", error);
//         return res.status(500).json("Internal server error");
//     }
// }

export const searchMedicines = async (req, res) => {
    try {
        const { searchQuery } = req.query;

        if (!searchQuery || searchQuery.trim() === "") {
            return res.status(400).json("Search query cannot be empty.");
        }

        const medicines = await Medicine.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: searchQuery, $options: "i" } },
                        { salt_composition: { $regex: searchQuery, $options: "i" } },
                        { introduction: { $regex: searchQuery, $options: "i" } },
                    ],
                },
            },
            {
                $addFields: {
                    matchScore: {
                        $cond: [
                            { $regexMatch: { input: "$name", regex: searchQuery, options: "i" } },
                            1, // Highest priority for matches in `name`
                            {
                                $cond: [
                                    { $regexMatch: { input: "$salt_composition", regex: searchQuery, options: "i" } },
                                    2, // Second priority for matches in `salt_composition`
                                    3, // Lowest priority for matches in `introduction`
                                ],
                            },
                        ],
                    },
                },
            },
            { $sort: { matchScore: 1 } }, // Sort by matchScore in ascending order
        ]);

        return res.status(200).json(medicines);
    } catch (error) {
        console.error("Error searching medicines:", error);
        return res.status(500).json("Internal server error");
    }
};
