import fs from "fs/promises";

export const createTask = async(req, res, next) => {
    try {
        await fs.appendFile("db.txt", `+${JSON.stringify(req.body)}`)
        console.log("Task created!");
        // throw new Error("Our artificial error")
        res.status(201).json({msg:"New task created!"})
    } catch (error) {
        const errorResponse = {
            status:500,
            error: "Internal server error!"
        }
        next(errorResponse);
        // res.status(500).json({msg:"Internal server error!"});
    }
};

export const getAllTasks = async(req, res) => {
    try {
        const data = await fs.readFile("db.txt", "utf-8");
        const dataArray = data.split("+").filter(Boolean);
        const jsonObjects = dataArray.map((elem)=> JSON.parse(elem));
        res.status(200).json(jsonObjects)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error!"});
    }
};

export const getOneTask = async(req, res) => {
    
};

export const updateOneTask = async(req, res) => {
    
};

export const deleteOneTask = async(req, res) => {
    
};

export const deleteAllTasks = async(req, res) => {
    try {
        await fs.writeFile("db.txt", "");
        res.status(200).json({msg: "All tasks deleted!"})
    } catch (error) {
        res.status(500).json({msg:"Internal server error!"})
    }
};


// app.delete("/deleteTasks", (req, res)=>{
//     fs.writeFile("db.txt", "")
//     .then(()=>{
//         console.log("Tasks deleted!");
//         res.status(200).json({message:"All tasks deleted!"})
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
// })