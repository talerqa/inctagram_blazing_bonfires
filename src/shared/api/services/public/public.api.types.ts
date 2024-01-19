import {ProfileUserType} from "@/shared/api";
import {
  GetAllPostsArgs,
  GetAllPublicPostsResponseType
} from "@/shared/api/services/posts/posts.api.types";

export type PublicProfileType = Pick<ProfileUserType, 'id' | 'userName' | 'aboutMe' | 'avatars'>

export type  PublicProfilePostsType = GetAllPostsArgs & {
  userId: number
}

export type  PublicProfilePostsResponseType = Omit<GetAllPublicPostsResponseType, 'totalUsers'>
