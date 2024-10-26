export default function handler(req, res) {
    const bearerToken = process.env.bearerToken; 
    if (!bearerToken) {
        return res.status(500).json({ error: 'Bearer token is not set' });
    }
    res.status(200).json({ bearerToken }); // Send the token as JSON
}