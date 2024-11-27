import mongoose from "mongoose";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connect = () => {
  mongoose.connect(
    `mongodb+srv://leonan:156020@dbmongo.zfzy9.mongodb.net/?retryWrites=true&w=majority&appName=dbMongo`
  );

  const connection = mongoose.connection;

  connection.on("error", () => {
    console.error("Erro ao conectar com o mongoDB");
  });

  connection.on("open", () => {
    console.log("Conetado ao mongoDB com sucesso!");
  });
};

connect();

module.exports = mongoose;
