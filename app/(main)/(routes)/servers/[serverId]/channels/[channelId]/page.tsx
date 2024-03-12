import {redirectToSignIn} from "@clerk/nextjs";
import {redirect} from "next/navigation";

import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";
import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMassages from "@/components/chat/chat-massages";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({params}: ChannelIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) redirect("/");

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={channel.serverId}
        name={channel.name}
        type="channel"
      />
      <ChatMassages
        members={member}
        name={channel.name}
        chatId={channel.id}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          serverId: channel.serverId,
          channelId: channel.id,
        }}
        paramKey="channelId"
        paramValue={channel.id}
      />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl={`/api/socket/messages`}
        query={{
          serverId: channel.serverId,
          channelId: channel.id,
        }}
      />
    </div>
  )
}

export default ChannelIdPage

