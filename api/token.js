export default function handler(req, res) {
    const bearerToken = process.env.bearerToken; // Access your environment variable
    res.status(200).json({ bearerToken }); // Send the token as JSON
}