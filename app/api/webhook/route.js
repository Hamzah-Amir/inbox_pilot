import crypto from "crypto";
import { prisma } from "@/lib/prisma"; // make sure path is correct

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const payload = JSON.stringify(req.body);
    const signature = req.headers["x-signature"];
    const secret = process.env.LEMON_SQUEEZY_SECRET;

    const hash = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    if (hash !== signature) return res.status(401).send("Invalid signature");

    const event = req.body.meta?.event_name;
    const data = req.body.data;
    const customData = req.body.meta?.custom_data;

    if (!data || !customData?.user_id) return res.status(400).send("Missing required data");

    const userId = customData.user_id;
    const subscriptionId = data.id.toString();
    const attributes = data.attributes;

    // Only handle subscription events
    if (!["subscription_created", "subscription_updated"].includes(event)) {
      console.log(`Ignoring event ${event}`);
      return res.status(200).send("Event ignored");
    }

    // Upsert subscription
    await prisma.subscription.upsert({
      where: { subscriptionId },
      create: {
        subscriptionId,
        customerId: attributes.customer_id.toString(),
        userId,
        status: attributes.status,
        renewsAt: attributes.renews_at ? new Date(attributes.renews_at) : null,
        plan: attributes.variant_name,
      },
      update: {
        status: attributes.status,
        renewsAt: attributes.renews_at ? new Date(attributes.renews_at) : null,
        plan: attributes.variant_name,
      },
    });

    // Set email limit based on exact variant name
    let emailLimit = 50; // default for TEMPLATE
    if (attributes.variant_name === "WEBSITE_PERSONALIZATION") {
      emailLimit = 200;
    }

    // Update user's plan and email limit
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: attributes.variant_name,
        emailLimit,
      },
    });

    console.log(`Webhook processed: ${event} | user: ${userId} | plan: ${attributes.variant_name}`);
    return res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).send("Internal Server Error");
  }
}
