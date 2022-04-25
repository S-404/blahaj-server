const {TeamsModel} = require('../../databases/todos')
const ApiError = require('../../exceptions/api-error')

class TeamsService {

    async create(name) {

        const team = await TeamsModel.findOne({where: {name}})

        if (team) {
            throw ApiError.BadRequest(`Group ${name} already exists`)
        }

        return await TeamsModel.create({name})
    }


    async getOne(id) {

        return await TeamsModel.findOne({where: {id}})

    }


    async getAll() {

        return await TeamsModel.findAll()

    }

    async update(id, name) {

        const group = await TeamsModel.findOne({where: {id}})
        group.name = name
        return await group.save()

    }

    async delete(id) {

        const group = await TeamsModel.findOne({where: {id}})
        return await group.destroy()

    }


}

module.exports = new TeamsService()