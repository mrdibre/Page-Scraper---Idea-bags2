"use strict";

const router  = require("express").Router()
const request = require("request")
const cheerio = require("cheerio")

router.post("/scrap", (req,res) => {

    const {link} = req.body

    request(link, (err,response,body) => {

        if(err){
            return res.json({response: false, err})
        }
        else if(response.statusCode === 200){

            return res.json({body})

        }

        return res.json({response})

    })

})

module.exports = router