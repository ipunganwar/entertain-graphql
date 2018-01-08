const axios = require('axios')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql')
const mongoose = require('mongoose')

let mongoSchema = mongoose.Schema({
  title: String,
  bahan: String
})

let mongoModel = mongoose.model('Resep', mongoSchema)

const ResepType = new GraphQLObjectType({
  name: 'Resep',
  description: '...',
  fields: () => ({
    title: { type: GraphQLString },
    bahan: { type: GraphQLString }
  })
})

const ResepInputType = new GraphQLInputObjectType({
  name: 'ResepInput',
  fields: {
    title: { type: GraphQLString },
    bahan: { type: GraphQLString }
  }
})

const AppMutation = new GraphQLObjectType({
  name: 'appMutation',
  fields: {
    addResep: {
      type: new GraphQLList(ResepType),
      args: {
        resepParam: {
          name: 'resep param',
          type: ResepInputType
        }
      },
      resolve: async (root, args) => {
        const { resepParam } = args
        await mongoModel.create(resepParam)
        let hasil = await mongoModel.find()
        return hasil
      }
    },

    editResep: {
      type: new GraphQLList(ResepType),
      args: {
        editParam: {
          name: 'edit resep',
          type: ResepInputType
        }
      },
      resolve: async (root, args) => {
        const { editParam } = args
        await mongoModel.findOneAndUpdate(args)
        let update = await mongoModel.find()
        return update
      }
    },

    deleteResep: {
      type: new GraphQLList(ResepType),
      args: {
        deleteParam: {
          name: 'delete resep',
          type: ResepInputType
        }
      },
      resolve: async (root, args) => {
        const { deleteParam } = args
        await mongoModel.findOneAndRemove(deleteParam)
        let destroy = await mongoModel.find()
        return destroy
      }
    }
  }
})


const appQuery = new GraphQLObjectType({
  name: 'Hello',
  fields: {
    resep: {
      type: new GraphQLList(ResepType),
      resolve: async () => await mongoModel.find()
    }
  }
})

const appSchema = new GraphQLSchema({
  query: appQuery,
  mutation: AppMutation
})

module.exports = appSchema