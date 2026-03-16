const express = require("express")
const app = express()

const CLOUD = process.env.CLOUD_PROVIDER || "Unknown Cloud"

app.get("/", (req, res) => {
    res.send(`Hello from ${CLOUD}`)
})

app.listen(80, () => {
    console.log("Server running")
})