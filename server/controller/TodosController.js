import todosModel from "../model/ToDosModel.js";


const addToDos = async(req,res)=>{
    try {
        const {title, status, priority,deadline} = req.body;
        const userId = req.body.userId;
        const newTodo = new todosModel({
            userId,
            title,
            status,
            priority,
            deadline,
        });

        await newTodo.save();
        res.status(201).json({ success: true, todo: newTodo });
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ success: false, message: "Error adding todo" });
    }

}

const listToDo = async(req,res)=>{
    try {
        const list = await todosModel.find({userId: req.body.userId});
        res.json({success: true, data: list})
    } catch (error) {
        console.log(error);
        res.json({success:false, mesesage:"Loi List"})
    } 
}


const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todosModel.findById(id);

        if (!todo) {
            return res.status(404).json({ success: false, message: "Công việc không tồn tại" });
        }

        res.json({ success: true, todo });
    } catch (error) {
        console.error("Lỗi khi lấy công việc:", error);
        res.status(500).json({ success: false, message: "Lỗi hệ thống" });
    }
};



const updateToDo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status, priority, deadline } = req.body;

        const updatedTodo = await todosModel.findByIdAndUpdate(
            id,
            { title, status, priority, deadline },
            { new: true } 
        );

        if (!updatedTodo) {
            return res.json({ success: false, message: "K co ToDos" });
        }

        res.json({ success: true, todo: updatedTodo });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.json({ success: false, message: "Loi updating todo" });
    }
};

const deleteToDo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await todosModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: "Khong tim thay Todos" });
        }

        res.status(200).json({ success: true, message: "Xoa thanh cong" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ success: false, message: "Loi xoa" });
    }
};


export {addToDos, updateToDo, listToDo, deleteToDo,getTodoById}