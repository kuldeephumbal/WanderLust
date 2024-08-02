const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

main()
.then(() => {
  console.log("connection successful");
})
.catch((err) => console.log(err));

async function main() {
await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

const seedDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: "66ab74f76b2d180d4485217f"}));
    await Listing.insertMany(initData.data);
    console.log("DB Seeded");
}   
seedDB();