import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth"
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const recentEmails = await prisma.email.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  console.log("Emails", recentEmails)

  const content = recentEmails.map(email => email.output);
  console.log(content);

  return Response.json({content: content,recentEmails: recentEmails}, { status: 200 });
}
