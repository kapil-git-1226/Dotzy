import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {

    const { id } = useParams();
    const { loading, data, fn } = useFetch(getLongUrl, id);

    useEffect(() => {
        fn();
    }, [])

    useEffect(() => {
        if (!loading && data && data.original_url) {
            console.log("Redirecting to:", data.original_url);

            // Store click analytics and redirect
            const handleRedirect = async () => {
                try {
                    // Call storeClicks function directly
                    await storeClicks({
                        id: data.id,
                        originalUrl: data.original_url,
                    });
                } catch (error) {
                    console.error("Error storing click:", error);
                }

                // Redirect regardless of analytics success
                window.location.href = data.original_url;
            };

            handleRedirect();
        }
    }, [loading, data]);

    if (loading) {
        return (
            <>
                <BarLoader width={"100%"} color="#36d7b7" />
                <br />
                Redirecting...
            </>
        );
    }

    if (!loading && !data) {
        return (
            <div className="text-center text-red-500 p-8">
                <h2 className="text-2xl font-bold mb-4">Short URL not found</h2>
                <p>The short URL you're trying to access doesn't exist.</p>
                <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
                    Go back to homepage
                </a>
            </div>
        );
    }

    return null;
};

export default RedirectLink;