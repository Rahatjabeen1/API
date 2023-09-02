const { connect } = require('mongoose')
require('dotenv').config()
const Category = require('./Schema')


const getAllCategories = async(req,res) => {
    try {
        await connect(process.env.MONGO_URI)
       
            const allCategories = await Category.find()
          res.json({
           
           category: allCategories
           })
        }
    
    catch (error) {
        res.json({
            message: error.message
        })
    }
}



const getCategorybyId =(req,res) =>{

}

const DeleteCategory =(req,res) =>{

}
const updateCategory= (req,res) =>{

}

const addCategory = async(req,res) =>{
    const { CategoryName, CategoryImage } = req.body

    if (!CategoryName || !CategoryImage) {
        res.status(403).json({
            message: "Invalid Values"
        })
    }

    else {

        try {
            await connect(process.env.MONGO_URI)
            const checkDuplicate = await Category.exists({ CategoryName: CategoryName })
            // console.log("Duplicate==>", checkDuplicate)

            if (checkDuplicate) {
                res.status(400).json({
                    message: "Category Already Exists"
                })
            }
            else {
                await Category.create({ CategoryName, CategoryImage })
                const allCategories = await Category.find()
res.json({
    message: "DB connected",
    category: allCategories
})
                // res.json({
                //     message: "Category Created Successfully",
                //     categories
                // })
            }
        }


        catch (error) {
            res.json({
                message: error.message
            })

        }

    }
}

module.exports = {getAllCategories,getCategorybyId,DeleteCategory,updateCategory,addCategory}