import User from '../models/User.js';
import URL from 'url';

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.loginUser(email, password);
        if (user) {
            return res.status(200).json({ message: "Login successful", user });
        }
        return res.status(401).json({ message: "Invalid email or password" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.signupUser(username, email, password);

        if (user) {
            return res.status(201).json({ message: "User created successfully", user });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const progress = async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const userProgress = await User.findOne({ email })
        .populate("progress");
    if (!userProgress) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userProgress.progress);
}

const bookmarks = async (req, res) => {
    const { email } = req.query;
    console.log("Email for bookmarks:", email);
    try {
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email })
            .populate("bookmarks");
        console.log("User found for bookmarks:", user)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user.bookmarks);
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const update_bookmarks= async (req, res) => {
    const url= URL.parse(req.url, true).query;
    const { email, questionId } = url;
    console.log("Email for updating bookmarks:", email);
    if (!email || !questionId) {
        return res.status(400).json({ message: "Email and questionId are required" });
    }
    try {
        const user = await User.updateOne(
            { email },
            { $push: { bookmarks: questionId } }
        );
        if (user.nModified === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        console.log("Bookmark updated successfully for user:", email);
        return res.status(200).json({ message: "Bookmark added successfully" });
    } catch (error) {
        console.error("Error updating bookmarks:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const update_progress = async (req, res) => {
    const url = URL.parse(req.url, true).query;
    const { email, questionId } = url;
    console.log("Email for updating progress:", email);
    if (!email || !questionId) {
        return res.status(400).json({ message: "Email and questionId are required" });
    }
    try {
        const user = await User.updateOne(
            { email },
            { $push: { progress: questionId } }
        );
        if (user.nModified === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        console.log("Progress updated successfully for user:", email);
        return res.status(200).json({ message: "Progress updated successfully" });
    } catch (error) {
        console.error("Error updating progress:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const remove_progress= async (req, res) => {
    const url = URL.parse(req.url, true).query;
    const { email, questionId } = url;
    console.log("Email for removing progress:", email);
    if (!email || !questionId) {
        return res.status(400).json({ message: "Email and questionId are required" });
    }
    try {
        const user = await User.updateOne(
            { email },
            { $pull: { progress: questionId } }
        );
        if (user.nModified === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        console.log("Progress removed successfully for user:", email);
        return res.status(200).json({ message: "Progress removed successfully" });
    } catch (error) {
        console.error("Error removing progress:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { signupUser, loginUser, progress, bookmarks, update_bookmarks, update_progress, remove_progress };
