import useTitle from "../../hooks/useTitle";
import { useGetFacebookUsersQuery } from "../../redux/features/api/userApi/userApi";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import UserCard from "../../components/cards/userCard/UserCard";

export default function Dashboard() {
    useTitle('Dashboard');
    const { data, isLoading, isError } = useGetFacebookUsersQuery('');

    const users = data?.data.users;

    let content;

    if (isLoading)
        content = <Loader />;

    if (!isLoading && isError)
        content = <ErrorMessage message="Something went wrong." />;

    if (!isLoading && !isError && users && users.length === 0)
        content = <ErrorMessage message='Opps! Sorry! There is no user available!' />;

    if (!isLoading && !isError && users && users.length > 0)
        content =
            <div className="bg-[#242526] max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 p-8 rounded-xl">
                {users && users.map((user: any) => <UserCard key={user._id} user={user} />)}
            </div>

    return (
        <div className="min-h-screen py-10 bg-[#18191A]">
            <div className="text-[#E4E6EB] text-center text-3xl m-0 p-0 mb-10 font-bold">All Avatar</div>
            {content}
        </div>
    );
}
