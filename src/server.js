// server.js
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// No async loading needed anymore — JSONs are loaded synchronously in the service
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});