const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../backend/db")
const cors = require("cors")

const JWT_SECRET = 'stoxxx1234';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    try {
        const { userName, passWord } = req.body;
        const existingUser = await User.findOne({ userName });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already taken"
            });
        }

        const user = await User.create({ userName, passWord, watchlists : [
            "IBM",
            "MSFT"
        ]});

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.json({ token });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.post("/signin", async (req, res) => {
    try {
        const { userName, passWord } = req.body;

        const existingUser = await User.findOne({ userName, passWord });

        if (!existingUser) {
            return res.status(404).json({
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

        res.json({ token });

    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});


app.get("/bulk", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.userId; 

        const user = await User.findById(userId); 
        
        if (!user) { 
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.watchlists || user.watchlists.length === 0) {
   
            return res.json({ watchlists: [] });
        }


        res.json({ watchlists: user.watchlists });
    } catch (error) {
        console.error("Error retrieving watchlist:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.put("/watchlist", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const {newWatchlist } = req.body;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.userId; 
  
      const user = await User.findByIdAndUpdate(userId, { watchlists : newWatchlist }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Watchlist updated successfully", user });
    } catch (error) {
      console.error("Error updating watchlist:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

app.listen(3000);