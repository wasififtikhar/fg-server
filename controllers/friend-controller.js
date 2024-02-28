const FriendsModel = require("../models/friend");
const UserModel = require("../models/user");
const { userResponseHandler } = require("../utils/response-handler");

const FriendController = {
  addFriend: (req, res) => {
    const {
      friend_name,
      friend_contact,
      friend_address,
      friend_type,
      current_user_id,
    } = req.body;

    const objtoSend = {
      friend_name: friend_name,
      friend_contact: friend_contact,
      friend_address: friend_address,
      friend_type: friend_type,
      isArchived: false,
    };

    FriendsModel.findOne({ friend_name })
      .then((friend) => {
        if (friend) {
          res.json(userResponseHandler("Friend already exixts", false, null));
        } else {
            console.log(objtoSend)
          FriendsModel.create(objtoSend)
            .then((friend) =>
              UserModel.findOne({ _id: current_user_id })
                .then((user) => {
                  user.friends.push(friend._id);
                  user.save();

                  res.json(
                    userResponseHandler(
                      "Friend Save Successfully",
                      true,
                      friend
                    )
                  );
                })
                .catch((error) => {
                  console.log(error);
                })
            )
            .catch((error) =>
              res.json(
                userResponseHandler("Internal server error", false, error)
              )
            );
        }
      })
      .catch(() => userResponseHandler("Database error", false, null));
  },

  getFriends: async (req, res) => {
    const { user } = req.user;
    const { isArchived } = req.query
    const userDetails = await UserModel.findById({ _id: user.data._id }).populate(
    {path: "friends", model: "Friends", match: {isArchived: isArchived}}
    );
    if (userDetails) {
      res.json(
        userResponseHandler("Friend get Successfully", true, userDetails)
      );
    } else {
      res.json(userResponseHandler("Friend get UnSuccessfully", false, null));
    }
  },

  deleteFriend: async (req, res) => {
    try {
      const { friend_id } = req.params;
      const { user } = req.user;
      const isFriend = await FriendsModel.findById(friend_id);
      if (isFriend) {
        const currentUser = await UserModel.findById(user.data._id);
        console.log(user);
        const checking = await currentUser.updateOne({
          $pull: { friends: friend_id },
        });

        const deletedFriend = await FriendsModel.deleteOne({ _id: friend_id });
        res.json(
          userResponseHandler(
            `Friend Deleted Successfully`,
            true,
            deletedFriend
          )
        );
      } else {
        res.json(userResponseHandler(`Friend Delete Unsuccessfully`, false, null));
      }
    } catch (error) {
      console.log(error);
      res.json(
        userResponseHandler(`Friend Deleted UnSuccessfully`, false, null)
      );
    }
  },

  archivedOrRestoreFriend: async (req, res) => {
    const {friend_id, isArchived} = req.body
    await FriendsModel.findById(friend_id).then((friend) => {
        friend.isArchived = isArchived;
        friend.save()
        if(friend.isArchived){
            res.json(userResponseHandler(`Friend Archived Successfully`, true, friend))
        } else {
            res.json(userResponseHandler(`Friend Restore Successfully`, true, friend))
        }
    }).catch((error) => {
        console.log(error)
    });
  },

  updateFriend: async (req, res) => {
    try {
      const updatedFriend = req.body
      const friendToUpdate = await FriendsModel.findById(updatedFriend._id);    
      const updated = await FriendsModel.findOneAndUpdate({_id:friendToUpdate._id}, updatedFriend, {
        new: true
      });
      res.json(userResponseHandler(`Friend Successfully Updated`, true, updated))
    } catch (error) {
      console.log(error)
      res.json(userResponseHandler(`Friend Unsuccessfully Updated`, false, null))
    }
  }
};
module.exports = FriendController;
