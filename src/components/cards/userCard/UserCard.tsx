import { useNavigate } from "react-router-dom";

export default function UserCard({ user }: any) {
    const navigate = useNavigate();

    const goToUserPage = () => {
        navigate(`/dashboard/users/${user?.facebookId}`);
    }

    return (
        <div onClick={goToUserPage} className="flex items-center cursor-pointer bg-[#18191A] rounded-lg px-4 py-4">
            <img
                src={user?.profilePicture}
                alt="Profile_Picture"
                className="rounded-lg"
            />
            <div className="ml-4">
                <h3 className="text-[#E4E6EB] font-bold">{user?.name}</h3>
                <p className="text-[#B0B3B8] text-xs">{user?.email}</p>
            </div>
        </div>
    )
}