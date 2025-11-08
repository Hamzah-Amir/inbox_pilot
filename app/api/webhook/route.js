
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {

    // Catch event type
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json()

    // Check signature
    const secret = "Hamza123"
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(await clonedReq.text()).digest("hex"), "utf8");
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid Signature");
    }


    console.log(body)

    if (eventType === 'subscription_created') {
      const userId = body.meta.custom_data.user_id
      console.log("User Id", userId)
      const emailLimit = body.data.attributes.product_name === "WEBSITE_PERSONALIZATION" ? 200 : 50;

      // Update user's plan and email limit
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          plan: body.data.attributes.product_name,
          emailLimit: emailLimit,
        },
      });

      console.log("LIMIT:", user.emailLimit)

      console.log(`Webhook processed!`);
    }
    // Upsert subscription
    // await prisma.subscription.upsert({
    //   where: { subscriptionId },
    //   create: {
    //     subscriptionId,
    //     customerId: attributes.customer_id.toString(),
    //     userId,
    //     status: attributes.status,
    //     renewsAt: attributes.renews_at ? new Date(attributes.renews_at) : null,
    //     plan: attributes.variant_name,
    //   },
    //   update: {
    //     status: attributes.status,
    //     renewsAt: attributes.renews_at ? new Date(attributes.renews_at) : null,
    //     plan: attributes.variant_name,
    //   },
    // });

    // // Set email limit based on exact variant name
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
