const express = require("express");
const { google } = require("googleapis")
const cors = require("cors");
const PORT = process.env.PORT || 8000

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("FPF-XEROX-API");
})

const auth = new google.auth.GoogleAuth({
    keyFile: "fpf-vgec-xerox.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

app.get("/done/:id", async (req, res) => {

    const { id } = req.params;

    // console.log(id);
    // res.send(id);

    // const spreadsheetId = "1Pbg5NOzkWKCvHIp5bIqj0pjcxmRpxY8IbE3kWjU3Vns";
    const spreadsheetId = "11SEeWywXK5fOdxd82A6hKkE6m4GTpyf4M2yRfeP51Dw";

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });

    // await googleSheets.spreadsheets.range("B2")
    await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: `sheet 1!B${id}`,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [["DONE"]]
        }
    })
    res.send("SUCCESS");
})


app.get("/data", async (req, res) => {

    const spreadsheetId = "11SEeWywXK5fOdxd82A6hKkE6m4GTpyf4M2yRfeP51Dw";

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "sheet 1",
    })


    res.send(getRows.data);
})

app.listen(PORT, (req, res) => console.log("App is running"));
