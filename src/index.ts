import { Server } from "http";
import app from "./app";
import { db } from "./db.config";

let appServer: Server | undefined;

db.then(async () => {
    appServer = await app.listen(3000, () => console.log('Server is listening on port 3000'));
});

export default appServer; 