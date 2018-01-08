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
  title: String
})

let mongoModel = mongoose.model('Resep', mongoSchema)

const resepData = [{
  title: 'ayam bakar'
}]

const ResepType = new GraphQLObjectType({
  name: 'Resep',
  description: '...',
  fields: () => ({
    title: { type: GraphQLString },
  })
})

const ResepInputType = new GraphQLInputObjectType({
  name: 'ResepInput',
  fields: {
    title: { type: GraphQLString }
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
          type
        }
      }
    }
  }
})


const appQuery = new GraphQLObjectType({
  name: 'Hello',
  fields: {
    resep: {
      type: new GraphQLList(ResepType),
      resolve: async () => {
        let a = await mongoModel.find()
        return a
      }
    }
  }
})

const appSchema = new GraphQLSchema({
  query: appQuery,
  mutation: AppMutation
})

module.exports = appSchema