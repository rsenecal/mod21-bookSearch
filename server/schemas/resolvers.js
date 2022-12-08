const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
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
        addUser: async (parent, { name, email, password }) => {
          const profile = await Profile.create({ name, email, password });
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const profile = await Profile.findOne({ email });
    
          if (!profile) {
            throw new AuthenticationError('No profile with this email found!');
          }
    
          const correctPw = await profile.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password!');
          }
    
          const token = signToken(profile);
          return { token, profile };
        },
    
        addBook: async (parent, { userId, authors, description, bookId,image,link, title }) => {
          return Profile.findOneAndUpdate(
            { _id: userId },
            {
              $addToSet: { 
                authors: authors,
                description: description,
                bookId: bookId,
                image: image,
                link: link,
                title: title
            },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        },
        removeUser: async (parent, { userId }) => {
          return User.findOneAndDelete({ _id: userId });
        },
        removeBook: async (parent, { userId, args }) => {
          return User.findOneAndUpdate(
            { _id: userId },
            { $pull: { args } },
            { new: true }
          );
        },
      },
    };
    
    module.exports = resolvers;

