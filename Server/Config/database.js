import mongoose from "mongoose";

export const db_connect = () => {
    const db_url = "mongodb+srv://lnmiitcampusconnect:Oeeb1sqD2H2LvVX7@campusconnect.o27we.mongodb.net/";

    mongoose.connect(db_url)
    .then(() => console.log('DATABASE CONNECTION SUCCESSFUL'))
    .catch((error) => {
        console.error('DATABASE CONNECTION FAILED');
        console.error(error);
    });
}
