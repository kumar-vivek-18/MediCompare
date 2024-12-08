import XLSX from 'xlsx';
import fs from 'fs';
import { Medicine } from '../models/medicine.model.js';
import { data } from './medicines.js';

export const convertExcelToJson = (req, res) => {
    try {
        // Check if a file is uploaded
        // console.log('hii there', req.files);
        if (!req.files) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        // Read the uploaded Excel file
        console.log('req file', req.files);
        const filePath = req.files.excel[0].path;
        console.log('file', filePath);
        const workbook = XLSX.readFile(filePath);
        // Get the first sheet name
        const sheetName = workbook.SheetNames[0];

        // Convert the first sheet to JSON
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Delete the uploaded file (cleanup)
        fs.unlinkSync(filePath);

        // Send the JSON data as a response
        return res.status(200).json(jsonData);
    } catch (error) {
        console.error("Error processing file:", error);
        return res.status(500).json({ error: "Internal server error!" });
    }
};

export const addMedicine = async (req, res) => {
    try {
        const allMedicines = await Promise.all(data.map((curr) => Medicine.create(curr)));

        return res.status(201).json(allMedicines);
    } catch (error) {
        console.error("Error while adding medicines:", error); // Logging for debugging
        return res.status(500).json("Internal server error");
    }
};

