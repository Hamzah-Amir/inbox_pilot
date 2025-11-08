import crypto from 'crypto'

export default async function handler(req, res) {
    const payload = JSON.stringify(req.body);
    const signature = req.headers['x-signature'];

    const secret = process.env.LEMON_SQUEEZY_SECRECT
    const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (hash !== signature) {
        return res.status(401).send("Invalid Signature")
    }

    await prisma.subscription.upsert({
        where: { subscriptionId: event.data.id.toString() },
        create: {
            subscriptionId: event.data.id.toString(),
            customerId: event.data.attributes.customer_id.toString(),
            userId: user.id,
            status: event.data.attributes.status,
            renewsAt: new Date(event.data.attributes.renews_at),
            plan: event.data.attributes.variant_name
        },
        update: {
            status: event.data.attributes.status,
            renewsAt: new Date(event.data.attributes.renews_at)
        }
    });


    const event = req.body.event;
    const data = req.body.data;

    console.log("Webhook Recieved!", event)

    res.status(200).send("OK")
}