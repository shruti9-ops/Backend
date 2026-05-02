
const project = require('../Models/project');

exports.createProject = async (req, res) => {

    try{
        const {name,description} = req.body;
        const newProject = await project.create({
            name,
            description,
            Admin:req.user.id,
            Members:[req.user.id]
        });

        res.status(201).json({message:"Project created successfully",project});
    }

    catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}

exports.addMember = async (req,res) => {
    try{
        const {projectId,userId} = req.body;

        const newProject = await project.findById(projectId);

        
        if(newProject.Admin.toString() !== req.user.id){
            return res.status(403).json({message:"Only admin can add members"});
        }

        if(newProject.Members.includes(userId)){
            return res.status(400).json({message:"User already a member"});
        }

        newProject.Members.push(userId);
        await newProject.save();

        res.status(200).json({message:"Member added successfully",project});
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}


exports.removeMember = async (req,res) => {
      try{
        const {projectId,userId} = req.body;

        const newProject = await project.findById(projectId);
        
        if(newProject.Admin.toString() !== req.user.id){
            return res.status(403).json({message:"Only admin can remove members"});
        }

         newProject.Members = newProject.Members.filter(
         m => m.toString() !== userId
  );
        await newProject.save();

        res.status(200).json({message:"Member Removed successfully",newProject});
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}

exports.getProjects = async (req, res) => {
    try {
        const userId = req.user.id;

        const projects = await project.find({
            $or: [
                { Admin: userId },   
                { Members: userId }     
            ]
        }).select("-__v");

        res.status(200).json({
            success: true,
            count: projects.length,
            projects
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const foundProject = await project.findById(id).populate("Members", "_id name email").populate("Admin", "_id name email");

        if (!foundProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            success: true,
            project: foundProject
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};
