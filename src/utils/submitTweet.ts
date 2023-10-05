"use server";
import { cookies } from "next/headers";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { Tweetschema } from "@/validationSchema/tweet";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

type optionsTypes =
  | {
      isReply: true;
      parentTweetId: string;
    }
  | {
      isReply: false | undefined;
      parentTweetId?: string;
    };

export const submitTweet = async (
  formData: FormData,
  options?: optionsTypes
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return;

    const tweetContent = formData.get("tweetText");
    const file = formData.get("image");

    if (!tweetContent && !file)
      return {
        success: false,
        message: "Tweet connot be empty",
      };
    const url = await uploadFile(session.user.id, file as File);

    const error = Tweetschema.safeParse({ content: tweetContent?.toString() });
    if (!error.success) return { error: error.error.format() };

    await db.tweet.create({
      data: {
        autherId: session.user.id,
        content: tweetContent?.toString().trim(),
        isReply: options?.isReply,
        parentTweetId: options?.parentTweetId,
        media: url,
      },
    });
    revalidatePath("/home");
    return {
      success: true,
      message: "Tweet post successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong, check console logs",
    };
  }
};

const uploadFile = async (userid: string, file?: File) => {
  if (file && file.type !== "application/octet-stream" && file.size !== 0) {
    const supabase = createServerActionClient({ cookies });
    const bucket = supabase.storage.from("Media");

    const { data, error } = await bucket.upload(
      userid + "/" + Date.now() + "image",
      file
    );
    if (error) {
      console.log(error);
      throw new Error("Cannot Upload media");
    } else {
      return bucket.getPublicUrl(data.path).data.publicUrl;
    }
  }
};
