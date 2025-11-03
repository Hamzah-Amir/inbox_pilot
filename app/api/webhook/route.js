import crypto from 'crypto'

export default function handler(req, res) {
    const payload = JSON.stringify(req.body);
    const signature = req.headers['x-signature'];

    const secret = process.env.LEMON_SQUEEZY_SECRECT
    const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (hash !== signature) {
        return res.status(401).send("Invalid Signature")
    }

    const event = req.body.event;
    const data = req.body.data;

    console.log("Webhook Recieved!", event)

    res.status(200).send("OK")
}