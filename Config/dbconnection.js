const mongoose = require("mongoose");

const connectDB = async () => {
      try {
            const connect = await mongoose.connect(
                     "mongodb+srv://admin:admin@clustercontacts.xhcp8yi.mongodb.net/mycontacts-backend?retryWrites=true&w=majority",
                  {
   useNewUrlParser: true,
   useUnifiedTopology: true
 });
            console.log(
              "Database connected:",connect.connection.host,connect.connection.name);
      } catch (error) {
            console.log(error);
            process.exit(1);
      }
}
module.exports = connectDB;