const Task = require("../Models/task");
const Project = require("../Models/project");


exports.createTask = async (req, res) => {

    try{
        const {title,description,projectId,assignedTo,dueDate,priority} = req.body;

        const project = await Project.findById(projectId);

if(!project){
            return res.status(404).json({message:"Project not found"});
        }

         if (project.Admin.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only admin can create tasks" });
    }

    if (!project.Members.includes(assignedTo)) {
      return res.status(400).json({ message: "User not in project" });
    }


        const newTask = await Task.create({
            title,
            description,
            project:projectId,
            assignedTo,
            dueDate,
            priority
        });

        res.status(201).json({message:"Task created successfully",task:newTask});
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}


exports.updateTask = async (req,res) => {

    try{
        const{taskId,status} = req.body;

        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        // Only the assigned user can update the task status
        if(task.assignedTo.toString() !== req.user.id){
            return res.status(403).json({message:"Only the assigned user can update this task"});
        }

        task.status = status;
        await task.save();

        res.status(200).json({message:"Task updated successfully",task});
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}

exports.getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            assignedTo: req.user.id
        });

        res.json({
            tasks
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};


exports.getTasks = async (req, res) => {

    try{
        const {projectId} = req.query;

        const project = await Project.findById(projectId);

        if(!project){
            return res.status(404).json({message:"Project not found"});
        }

const isMember = project.Members.includes(req.user.id);

        if(!isMember){
            return res.status(403).json({message:"Only members can view tasks"});
        }

           const tasks = await Task.find({
            project: projectId
        });

        res.json(tasks);
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}