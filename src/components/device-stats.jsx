import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Device({stats}) {

    const deviceCount = stats.reduce((acc, item)=>{
        if(!acc[item.device]){
            acc[item.device] = 0;
        }
        acc[item.device]++;
        return acc;
    }, {});

    const result = Object.keys(deviceCount).map((device)=>({
        device,
        count: deviceCount[device],
    }));
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={700} height={700}>
                <Pie data={result} labelLine={false} label={({device, percent})=>`${device}: ${(percent*100).toFixed(0)}%`} dataKey="count" fill="#8884d8">
                    {result.map((_, index)=>(
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
