import mongoose from 'mongoose';

// Connection string
const connectionString = process.env.MONGODB_CONNECTION_STRING;

// Connect to MongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Handle connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);



const userPuzzleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    puzzleSet: { type: Number, required: true },
    serialNo: {type: Number, required: true},
    puzzleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Puzzles', required: true },
    isSolved: { type: Boolean, default: false },
    isAttempted: { type: Boolean, default: false },
    question_1: {type: String, default: ""},
    question_2_1: {type: String, default: ""},
    question_2_2: {type: String, default: ""},
    question_3: {type: String, default: ""},
    timestamp: { type: Date, default: Date.now }
});
const UserPuzzle = mongoose.models.UserPuzzle || mongoose.model('UserPuzzle', userPuzzleSchema);


const puzzleSchema = new mongoose.Schema({
    PuzzleId: { type: String, default: "", required: true},
    FEN: { type: String, default: "", required: true},
    Moves: { type: String, default: "", required: true},
    Rating: { type: Number, default: 1500, required: true},
    RatingDeviation: { type: Number, default: 70},
    Popularity: { type: Number, default: 100},
    NbPlays: { type: Number, default: 1500},
    Themes: { type: String, default: ""},
    GameUrl: { type: String, default: ""},
    Set: { type: Number, default: 1, required: true},
    serialNo: {type: Number, required: true}
}
);




const Puzzle = mongoose.models.Puzzle || mongoose.model('Puzzle', puzzleSchema);

export { db, User, UserPuzzle, Puzzle };