import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/joke",(req,res)=>{
    res.render("joke.ejs")
});

app.post("/joke", async (req, res) => {
  try {
    const type = req.body.type;
    const category=req.body.category;
    const amount= req.body.amount;
    const response = await axios.get(`${API_URL}${category}?type=${type}&amount=${amount}&format=txt`);
    const result = response.data;
    res.render("joke.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("joke.ejs", { error: error.message });
  }
});



app.listen(port , ()=>{
    console.log(`Server started at ${port}`);
})

