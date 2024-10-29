import { Link, useParams } from "react-router-dom";
import { useGetFacebookUserLikedPagesQuery, useGetFacebookUserPostsQuery, useGetFacebookUserQuery } from "../../redux/features/api/userApi/userApi";
import Loader from "../../components/loader/Loader";
import PostCard from "../../components/cards/postCard/PostCard";
import { useState } from "react";
import LikedPageCard from "../../components/cards/likedPageCard/LikedPageCard";

export default function User() {
    const [menuName, setMenuName] = useState('Posts');
    const { facebookId } = useParams();
    const { data: userData, error: userError, isLoading: userIsLoading } = useGetFacebookUserQuery(facebookId as string);
    const { data: postsData, error: postsError, isLoading: postsIsLoading } = useGetFacebookUserPostsQuery(facebookId as string);
    const { data: likedPagesData, error: likedPagesError, isLoading: likedPagesIsLoading } = useGetFacebookUserLikedPagesQuery(facebookId as string);

    const user = userData?.data?.user;
    const posts = postsData?.data?.posts;
    const likedPages = likedPagesData?.data?.likedPages;

    const postsDataPaging = postsData?.data?.paging;
    const likedPagesDataPaging = likedPagesData?.data?.paging;

    const menuItems = ['Posts', 'Liked Pages', 'Basic Info'];

    console.log(user)

    return (
        <div className="flex">
            {/* Left Menu (Fixed) */}
            <aside className="fixed w-[25%] h-full bg-[#18191A] text-white p-4">
                {
                    userIsLoading ?
                        <>
                            <Loader />
                        </>
                        :
                        <>
                            <div className="py-2 mb-5">
                                <div className="flex items-center">
                                    <img
                                        src={user?.profilePicture}
                                        alt="Profile_Picture"
                                        className="rounded-full"
                                    />
                                    <div className="ml-3">
                                        <h3 className="text-[#E4E6EB] font-bold">{user?.name}</h3>
                                        <p className="text-[#B0B3B8] text-xs">{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <nav>
                                <ul>
                                    {menuItems.map((item) => (
                                        <li key={item} className="mb-5">
                                            <h3
                                                className={`block cursor-pointer py-2 px-4 rounded ${menuName === item ? 'bg-[#303031] text-white' : 'hover:bg-[#303031]'
                                                    }`}
                                                onClick={() => setMenuName(item)}
                                            >
                                                {item}
                                            </h3>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </>
                }
            </aside>

            {/* Right Content */}
            <main className="bg-[#F0F2F5] ml-[25%] w-[75%] min-h-screen p-8">
                {
                    postsIsLoading && likedPagesIsLoading ?
                        <>
                            <Loader />
                        </>
                        :
                        <>
                            <h1 className="text-4xl text-center font-bold mb-8">{menuName}</h1>

                            <div className="flex items-center flex-col">
                                {menuName === 'Posts' && posts && posts.map((post: any) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>

                            <div className="flex items-center flex-col">
                                {menuName === 'Liked Pages' && likedPages && likedPages.map((likedPage: any) => (
                                    <LikedPageCard key={likedPage.id} likedPage={likedPage} />
                                ))}
                            </div>

                            <div className="flex items-center flex-col">
                                {menuName === 'Basic Info' && (
                                    <div className="bg-[#fff] w-[700px] px-4 py-4 mb-4 rounded-xl shadow">
                                        <div className="flex mb-5">
                                            <img
                                                src={user?.profilePicture}
                                                alt="Profile_Picture"
                                                width={80}
                                                height={80}
                                                className="border-2 border-gray-200 p-0.5"
                                            />
                                        </div>

                                        <div className="flex justify-between border-b pb-4 mb-4">
                                            <p className="font-medium">Name</p>
                                            <p>{user?.name}</p>
                                        </div>

                                        <div className="flex justify-between border-b pb-4 mb-4">
                                            <p className="font-medium">Email</p>
                                            <p>{user?.email}</p>
                                        </div>

                                        <div className="flex justify-between border-b pb-4 mb-4">
                                            <p className="font-medium">Gender</p>
                                            <p className="capitalize">{user?.gender}</p>
                                        </div>

                                        <div className="flex justify-between border-b pb-4 mb-4">
                                            <p className="font-medium">Birthday</p>
                                            <p>{user?.birthday}</p>
                                        </div>

                                        <div className="flex justify-between border-b pb-4 mb-4">
                                            <p className="font-medium">Hometown</p>
                                            <p>{user?.hometown}</p>
                                        </div>

                                        <div className="flex justify-between border-b pb-4 mb-4">
                                            <p className="font-medium">Current City</p>
                                            <p>{user?.location}</p>
                                        </div>

                                        <div className="flex justify-between mb-2">
                                            <p className="font-medium">Facebook Profile</p>
                                            <Link
                                                to={user?.link}
                                                target="_blank"
                                                className="text-blue-600 underline"
                                            >
                                                Click Here to Go Profile
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                }
            </main>
        </div>
    );
}
