// const express = require("express");
// const fetch = require("node-fetch");

// const app = express();

// const POSTEX_TOKEN = "OGE2NDA3OTNiYzE0NDQ2MjhjMjJkNzE5Y2JkNzFhZGY6YjMxOGMxYmU0YTFkNDQ5ZDk4YTM1YjQyNWUxNGViOTk=";

// app.get("/api/track", async (req,res)=>{

// const tracking = req.query.tracking;

// const response = await fetch(
// `https://api.postex.pk/services/integration/api/order/v1/track-order/${tracking}`,
// {
// headers:{
// "token":POSTEX_TOKEN
// }
// }
// );

// const data = await response.json();

// res.json(data.dist);

// });

// app.listen(3000,()=>{
// console.log("Tracking API running");
// });






// const express = require("express");
// const fetch = require("node-fetch");

// const app = express();

// const PORT = 3000;

// // 🔑 PostEx API Token
// const POSTEX_TOKEN = "OGE2NDA3OTNiYzE0NDQ2MjhjMjJkNzE5Y2JkNzFhZGY6YjMxOGMxYmU0YTFkNDQ5ZDk4YTM1YjQyNWUxNGViOTk=";

// app.get("/api/track", async (req, res) => {

// try {

// const tracking = req.query.tracking;

// if (!tracking) {
// return res.status(400).json({
// success: false,
// message: "Tracking number is required"
// });
// }

// const response = await fetch(
// `https://api.postex.pk/services/integration/api/order/v1/track-order/${tracking}`,
// {
// method: "GET",
// headers: {
// "token": POSTEX_TOKEN,
// "Content-Type": "application/json"
// }
// }
// );

// const data = await response.json();

// // PostEx error handling
// if (data.statusCode !== "200") {
// return res.status(400).json({
// success: false,
// message: data.statusMessage
// });
// }

// // Success response
// res.json({
// success: true,
// data: {
// customerName: data.dist.customerName,
// customerPhone: data.dist.customerPhone,
// deliveryAddress: data.dist.deliveryAddress,
// cityName: data.dist.cityName,
// trackingNumber: data.dist.trackingNumber,
// orderDetail: data.dist.orderDetail,
// transactionStatus: data.dist.transactionStatus,
// transactionDate: data.dist.transactionDate,
// orderRefNumber: data.dist.orderRefNumber,
// statusHistory: data.dist.transactionStatusHistory
// }
// });

// } catch (error) {

// console.error("Tracking API Error:", error);

// res.status(500).json({
// success: false,
// message: "Server error while fetching tracking data"
// });

// }

// });

// // Root route (testing)
// app.get("/", (req,res)=>{
// res.send("PostEx Tracking API Running");
// });

// app.listen(PORT, () => {
// console.log(`Tracking API running on http://localhost:${PORT}`);
// });







// import express from "express";

// const app = express();
// const PORT = 3000;

// const POSTEX_TOKEN = "OGE2NDA3OTNiYzE0NDQ2MjhjMjJkNzE5Y2JkNzFhZGY6YjMxOGMxYmU0YTFkNDQ5ZDk4YTM1YjQyNWUxNGViOTk=";

// app.get("/api/track", async (req,res) => {
//   try {
//     const tracking = req.query.tracking;
//     if (!tracking) return res.status(400).json({ success:false, message:"Tracking number required" });

//     const response = await fetch(`https://api.postex.pk/services/integration/api/order/v1/track-order/${tracking}`, {
//       method:"GET",
//       headers:{ token: POSTEX_TOKEN, "Content-Type":"application/json" }
//     });

//     const data = await response.json();
//     res.json(data.dist);

//   } catch(error){
//     console.error("Tracking API Error:", error);
//     res.status(500).json({ success:false, message:error.message });
//   }
// });

// app.listen(PORT, () => console.log(`Tracking API running on http://localhost:${PORT}`));




// // PERFACT CODE DEPLOYED

// // server.js
// import express from "express";
// import dotenv from "dotenv";

// dotenv.config(); // <-- correct way in ESM

// const app = express();
// const PORT = process.env.PORT || 3000;
// const POSTEX_TOKEN = process.env.MY_POSTEX_TOKEN;

// // Node v18+ me fetch built-in hai, ES module me direct use ho sakta hai
// app.get("/api/track", async (req, res) => {
//   try {
//     const tracking = req.query.tracking;
//     if (!tracking) return res.status(400).json({ success: false, message: "Tracking number required" });

//     const response = await fetch(`https://api.postex.pk/services/integration/api/order/v1/track-order/${tracking}`, {
//       method: "GET",
//       headers: { token: POSTEX_TOKEN, "Content-Type": "application/json" }
//     });

//     const data = await response.json();

//     res.json(data.dist); // ya pura data.json() agar aapko success/error messages bhi chahiye
//   } catch (error) {
//     console.error("Tracking API Error:", error);
//     res.status(500).json({ success: false, message: "Server error while fetching tracking data" });
//   }
// });

// app.listen(PORT, () => console.log(`Tracking API running on http://localhost:${PORT}`));






// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// ✅ CORS (Shopify + local testing dono allow)
app.use(cors({
  origin: [
    "https://thenaturemist.myshopify.com",
    "http://localhost:3000"
  ]
}));

const PORT = process.env.PORT || 3000;
const POSTEX_TOKEN = process.env.MY_POSTEX_TOKEN;

// ✅ Route
app.get("/api/track", async (req, res) => {
  try {
    const tracking = req.query.tracking;

    if (!tracking) {
      return res.status(400).json({
        success: false,
        message: "Tracking number required"
      });
    }

    const response = await fetch(
      `https://api.postex.pk/services/integration/api/order/v1/track-order/${tracking}`,
      {
        method: "GET",
        headers: {
          token: POSTEX_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    // ✅ Better response handling
    if (!data || !data.dist) {
      return res.status(404).json({
        success: false,
        message: "Tracking not found"
      });
    }

    res.json(data.dist);

  } catch (error) {
    console.error("Tracking API Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching tracking data"
    });
  }
});

// ✅ Render-friendly log
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
