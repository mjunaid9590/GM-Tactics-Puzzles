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
    puzzleId: { type: String, ref: 'Puzzles', required: true },
    isSolved: { type: Boolean, default: false },
    isAttempted: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
  });
  const UserPuzzle = mongoose.models.UserPuzzle || mongoose.model('UserPuzzle', userSchema);


const puzzleSchema = new mongoose.Schema({
    // Schema fields for the second collection
});




const Puzzle = mongoose.models.Puzzle || mongoose.model('Puzzle', puzzleSchema);

export {db, User, UserPuzzle, Puzzle };