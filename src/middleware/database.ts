import mongoose from "mongoose";

const connection = process.env.MONGO_URI || "no";

if (connection !== "no") {
  mongoose.connect(
    connection,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log(`Connected to Database`);
    }
  );
} else {
  throw Error("Can't connect to the server, URI not specified");
}
