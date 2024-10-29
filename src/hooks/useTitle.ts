import { useEffect } from "react";

const useTitle = (title: string): void => {
    useEffect(() => {
        if (title === "Home") {
            document.title = `Avatar Management System`;
        } else {
            document.title = `${title} | Avatar Management System`;
        }
    }, [title]);
};

export default useTitle;