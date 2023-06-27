import { QuadricountModel } from "../../model/quadricount/quadricountModel"

export class QuadricountController{

    public static async findCount(req, res){
        res.send(await QuadricountModel.findOneCount(req.params.id))
    }

    public static async findAllCounts(req, res){
        res.send(await QuadricountModel.findAllCountsExisting())
    }

    public static async createCount(req, res){
        await QuadricountModel.createNewCount(req.body)
        res.status(200)
        res.json({response : true, message: "New QuadriPage created!"})
    }

    public static async deleteCount(req, res){
        res.send(await QuadricountModel.deleteOneCount(req.params.id))
    }

    public static async updateCount(req, res){
        await QuadricountModel.updateExistingCount(req.body, req.params.id)
        res.status(200)
        res.json({response : true, message: "QuadriPage Updated!"})
    }

    public static async updateContributors(req, res){
        await QuadricountModel.updateExistingContributors(req.body, req.params.id)
        res.status(200)
        res.json({response : true, message: "QuadriPage Updated!"})
    }

    public static async updateCategory(req, res){
        await QuadricountModel.updateExistingCategory(req.body, req.params.id)
        res.status(200)
        res.json({response : true, message: "QuadriPage Updated!"})
    }

}