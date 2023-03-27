const  mongoose  = require("mongoose")

const conection = mongoose.connect(
  "mongodb+srv://mustaq:mustaq7714@cluster0.vaosnoy.mongodb.net/fsapp2?retryWrites=true&w=majority"
);

module.exports={
    conection
}