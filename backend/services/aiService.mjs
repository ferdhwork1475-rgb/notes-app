// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const generateUsernames = async (fullname) => {
//   try {
//     const response = await openai.responses.create({
//       model: "gpt-5.4-mini",
//       input: `Use the provided Full Name to generate 3 unique, high-quality username suggestions. "${fullname}". Output only the usernames separated by commas.`,
//       store: true,
//     });

//     let suggestions = response.output_text
//       .split(",")
//       .map((username) => username.trim()); //".split" usually refers to the programming method used to divide a string into an array of substrings based on a specified delimiter
//     return suggestions.map((username) => `${username}_${Math.floor(Math.random() * 1000)}`); 
//   } catch (error) {
//     console.log(error);
//   }
// };