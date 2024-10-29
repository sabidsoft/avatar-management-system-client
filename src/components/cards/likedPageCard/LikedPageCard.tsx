export default function LikedPageCard({ likedPage }: any) {
    return (
        <a
            href={likedPage?.link}
            target="_blank"
            rel="noreferrer"
            className="bg-[#fff] w-[700px] px-4 py-4 mb-4 cursor-pointer rounded-xl shadow"
        >
            <div className="flex justify-between">
                <div className="flex">
                    <img
                        src={likedPage?.picture?.data?.url}
                        alt="Page_Profile_Picture"
                        className="border rounded-lg"
                    />
                    <div className="ml-4">
                        <h3 className="text-[#050505] font-bold">{likedPage?.name}</h3>
                        <p className="text-[#777] text-xs font-semibold">{likedPage?.category}</p>
                    </div>
                </div>
                <div>
                    <h5 className="font-semibold text-sm text-right">Likes</h5>
                    <p className="text-[#777] text-xs text-right">{likedPage?.fan_count}</p>
                </div>
            </div>
            <p className="pt-4 text-sm">{likedPage?.about}</p>
        </a>
    );
}