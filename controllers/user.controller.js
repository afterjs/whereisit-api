const configFirebase = require('../firebase')


function getAllUsers(req, res) {
  const listAllUsers = (nextPageToken) => {
    configFirebase.admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  };
  
  listAllUsers();
}





module.exports = {
  getAllUsers
};