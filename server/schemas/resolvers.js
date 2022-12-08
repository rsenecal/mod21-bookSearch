const { AuthenticationError } = require('apollo-server-express');
const { Book } = require('../models');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {

        users: async () => {
            return Profile.find();
          },
      
          user: async (parent, { userId }) => {
            return Profile.findOne({ _id: userId });
          },

        };


    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create({ args });
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await Profile.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No profile with this email found!');
          }
    
          const correctPw = await profile.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password!');
          }
    
          const token = signToken(user);
          return { token, user };
        },
    
        saveBook: async (parent, { book }, context ) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: { saveBooks: book },
            },
            {
              new: true,
              runValidators: true,
            }
          )
          return updateUser;
        }
        throw new AuthenticationError('Please login first')
        
        },


        saveBook: async (parent, { book }, context ) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: { saveBooks: book },
            },
            {
              new: true,
              runValidators: true,
            }
          )
          return updateUser;
        }
        throw new AuthenticationError('Please login first')
        
        },
    
    module.exports = resolvers;

