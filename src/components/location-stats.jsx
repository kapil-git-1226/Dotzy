import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Location({stats}) {

    const cityCount = stats?.reduce((acc, item) => {
        if (acc[item.city]){
            acc[item.city] += 1;
        }else acc[item.city] = 1;
        return acc;
    }, {});

    const cities = Object.entries(cityCount).map(([city, count]) =>({
        city,
        count,
    }));

    return (
        <div style={{width:"100%" , height:800}}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={700}
                    height={300}
                    data={cities.slice(0,5)}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    
                    <XAxis dataKey="city" />
                    <YAxis />
                    <Tooltip labelStyle={{color:"green"}}/>
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
