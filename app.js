"use strict";

const express = require("express")
const app     = express()
const path    = require("path")

app.use( express.static(__dirname+"/frontend") )
app.use(express.json())

app.use( require("./routes") )

app.use("/", (req,res) => {
    return res.sendFile( path.join(__dirname,"./frontend/index.html") )
})

const server = app.listen(3000, () => {
    console.log("Server running")
})