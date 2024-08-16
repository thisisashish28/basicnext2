import dbConnect from "../utils/dbConnect";
import User from "../models/User";
import page from "../models/page";

export async function getPages(pageName) {
try {
    await dbConnect();
    
    const existingPage = await page.findOne({pageName});
    //console.log(existingPage);
    if (existingPage) {
        const userId = existingPage.userid;
//console.log(userId);
        const user = await User.findById(userId);
        const userDetails = {};
        userDetails.full_name = user.full_name;
        userDetails.email = user.email;
        userDetails.image = user.image;
        return {existingPage, userDetails};
    }
}
catch(error){
    console.log(error);
}
}


export async function makePage(pageName, email) {
    try {
        await dbConnect();
        console.log(email, pageName);

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const userId = user._id;

        // Check if the page already exists
        const existingPage = await page.findOne({ pageName });
        if (existingPage) {
            throw new Error("Page already exists");
        }

        // Create and save new page
        const newPage = new page({
            pageName,
            createdAt: Date.now(),
            userid: userId, // Ensure this matches your schema field
        });
        await newPage.save();
        return newPage;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
