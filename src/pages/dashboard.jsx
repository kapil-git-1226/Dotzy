import CreateLink from '@/components/create-link';
import Error from '@/components/error';
import LinkCard from '@/components/link-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UrlState } from '@/context';
import { getClicksForUrls } from '@/db/apiClicks';
import { getUrls } from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import { FilterIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';

const Dashboard = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const { user } = UrlState();
    const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user?.id);
    const { loading: loadingClicks, data: clicks, fn: fnClicks } = useFetch(getClicksForUrls, urls?.map((url) => url.id));

    useEffect(() => {
        fnUrls()
    }, [])

    useEffect(() => {
        if (urls?.length) fnClicks();
    }, [urls?.length]);

    const filteredUrls = urls?.filter((url) =>
        url.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flex flex-col gap-8 px-4 sm:px-6 lg:px-8'>
            {loading || loadingClicks && <BarLoader width={"100%"} color="#36d7b7" />}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Links Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{urls?.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{clicks?.length}</p>
                    </CardContent>
                </Card>
            </div>

            <div className='flex justify-between'>
                <h1 className='text-4xl font-extrabold'>My Links</h1>
                <CreateLink />
            </div>

            <div className='relative'>
                <Input
                    type="text"
                    placeholder="Search your links..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FilterIcon className='absolute top-2 right-2 p-1' />
            </div>
            {error && <Error message={error?.message} />}
            {(filteredUrls || []).map((url, i) => {
                return <LinkCard key={i} url={url} fetchUrls={fnUrls} />
            })}
        </div>
    );
};
export default Dashboard;