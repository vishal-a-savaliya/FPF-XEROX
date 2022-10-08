const express = require("express");
const { google } = require("googleapis")

const app = express();

app.get("/", async (req, res) => {

    const spreadsheetId = "1Pbg5NOzkWKCvHIp5bIqj0pjcxmRpxY8IbE3kWjU3Vns";

    const auth = new google.auth.GoogleAuth({
        keyFile: "fpf-vgec-xerox.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "sheet 1",
    })

    // await googleSheets.spreadsheets.range("B2")
    await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: "sheet 1!B2",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [["nope"]]
        }
    })



    res.send(getRows.data);
})


app.listen(3000, (req, res) => console.log("running on 3000"));