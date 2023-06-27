import {Schema} from "mongoose"

const mongoose = require('mongoose')

const quadriScheme = new Schema({
    pageName : {type : String, required : true},
    createdBy : {type : String, required : true},
    createdOn : {type : Date, default : new Date()},
    modifiedOn : {type : Date, default : new Date()},
    contributors : {type : Object, required : true},
    toPay : {type : Object, default : null},
    categories : {type : Object, default : null}
})

const QuadriModel = mongoose.model("quadriPages", quadriScheme)

export class QuadricountModel{

    public static async findOneCount(id : String){
        
        return await QuadriModel.findById(id)
    }

    public static async findAllCountsExisting(){
        
        return await QuadriModel.find()
    }

    public static async createNewCount(body : { 
            pageName : String,
            createdBy : String,
            contributors : {},
            toPay : {}
            categories : {}
        }
    ){
        const createQuadriPage = new QuadriModel({
            pageName : body.pageName,
            createdBy : body.contributors[0].name,
            contributors : body.contributors,
            toPay : body.toPay,
            categories : body.categories
        })

        return await createQuadriPage.save()
    }

    public static async deleteOneCount(id : String){
        
        return await QuadriModel.findByIdAndDelete(id)
    }


    public static async updateExistingCount(body : { 
            toPay : { 
                name : String,
                price : Number,
                payedBy : String,
                currency : String
            } 
        }, id : String ){

        const findQuadriPage = await QuadriModel.findById(id)

        findQuadriPage.modifiedOn = new Date()
        findQuadriPage.toPay = body.toPay

        return await findQuadriPage.save()
    }

    public static async updateExistingContributors(body : { contributor : {} }, id : String ){

        const findQuadriPage = await QuadriModel.findById(id)

        findQuadriPage.modifiedOn = new Date()
        if(findQuadriPage.contributors == null){
            findQuadriPage.contributors = [body.contributor]
        }else{
            findQuadriPage.contributors = [...findQuadriPage.contributors , body.contributor]
        }

        return await findQuadriPage.save()
    }

    public static async updateExistingCategory(body : { category : {} }, id : String ){

        const findQuadriPage = await QuadriModel.findById(id)

        findQuadriPage.modifiedOn = new Date()
        if(findQuadriPage.categories == null){
            findQuadriPage.categories = [body.category]
        }else{
            findQuadriPage.categories = [...findQuadriPage.categories , body.category]
        }
        

        return await findQuadriPage.save()
    }

}