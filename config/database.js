import mongoose from "mongoose";

export const startConnection = (app) => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("Succesfully connected to mongodb");
      const port = process.env.PORT;
      app.listen(port, () => {
        console.log("Server running on port", port);
      });
    })
    .catch((err) => {
      console.error("Could not connect to db", err);
      process.exit(1);
    });
};
