import { useGetFacebookUserQuery } from "../../../redux/features/api/userApi/userApi";
import Loader from "../../loader/Loader";
import { format, formatDistanceToNow, parseISO } from "date-fns";

export default function PostCard({ post }: any) {
    const { data: userData, error: userError, isLoading: userIsLoading } = useGetFacebookUserQuery(post?.from?.id as string);

    const user = userData?.data?.user;

    if (userIsLoading) return <Loader />;

    // Format the dates
    const createdTimeAgo = post?.created_time ? formatDistanceToNow(parseISO(post?.created_time), { addSuffix: true }) : 'N/A';
    const createdTime = post?.created_time ? format(parseISO(post?.created_time), 'h:mm:ss a - MMM d, yyyy') : 'N/A';
    const updatedTime = post?.updated_time ? format(parseISO(post?.updated_time), 'h:mm:ss a - MMM d, yyyy') : 'N/A';

    return (
        <div className="bg-[#fff] w-[700px] mb-4 rounded-xl shadow">
            <div className="flex justify-between items-center px-4 pt-4">
                <div className="flex">
                    <img
                        src={user?.profilePicture}
                        alt="Profile_Picture"
                        className="rounded-full w-[40px] h-[40px] border border-blue-500"
                    />
                    <div className="ml-2">
                        <h3 className="text-[#050505] text-sm font-semibold">{user?.name}</h3>
                        <p className="text-[#B0B3B8] text-xs">{createdTimeAgo}</p>
                    </div>
                </div>
                <div>
                    <p>
                        <strong className="font-semibold text-sm">Privacy</strong>
                    </p>
                    <p className="text-[#777] text-xs">
                        {post?.privacy?.description === 'Public' && 'Public'}
                        {post?.privacy?.description === 'Only me' && 'Only me'}
                        {post?.privacy?.description === 'Your friends' && 'Friends'}
                        {
                            post?.privacy?.description === 'Public' ||
                                post?.privacy?.description === 'Only me' ||
                                post?.privacy?.description === 'Your friends' ?
                                null : 'Custom'
                        }
                    </p>
                </div>
            </div>

            {/* for message */}
            <div className="px-4 py-4">
                {post?.message && <p>{post?.message}</p>}
            </div>
            <div>
                {/* for image */}
                {
                    post?.attachments?.data?.[0].media?.image?.src &&
                    !post?.attachments?.data?.[0].media?.source &&
                    <img
                        src={post?.attachments?.data?.[0].media?.image?.src}
                        alt="Post_Photo"
                        className=""
                    />
                }

                {/* for video */}
                {
                    post?.attachments?.data?.[0].media?.source &&
                    post?.attachments?.data?.[0]?.type !== 'share' &&
                    <video
                        controls
                        className="w-full max-h-[400px]"
                    >
                        <source src={post?.attachments?.data?.[0].media?.source} />
                    </video>
                }

                {/* for share video from youtube */}
                {
                    post?.attachments?.data?.[0]?.type === 'share' &&
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/RGq12hnxvkk?autoplay=1"
                        title="YouTube video player"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                }

                {/* for share video from facebook */}
                {
                    !post?.message &&
                    !post?.attachments?.data?.[0].media?.image?.src &&
                    !post?.attachments?.data?.[0].media?.source &&
                    post?.attachments?.data?.[0]?.type !== 'share' &&
                    <p className="px-4 py-2">Facebook video shared.</p>
                }
            </div>
            {
                post?.link &&
                <div className="px-4 pt-3 text-center">
                    <a
                        href={post?.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2d68bb] font-semibold hover:underline"
                    >
                        {post?.privacy?.description === 'Public' && 'See Original Post'}
                    </a>
                </div>
            }
            <div className="flex justify-between pb-3 px-4">
                <div>
                    <h5 className="text-sm font-semibold">Post Created</h5>
                    <p className="text-[#777] text-xs">{createdTime}</p>
                </div>
                {
                    createdTime !== updatedTime &&
                    <div>
                        <h5 className="text-sm font-semibold text-right">Last Updated</h5>
                        <p className="text-[#777] text-xs">{updatedTime}</p>
                    </div>
                }
            </div>
        </div>
    );
}