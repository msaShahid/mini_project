interface StatType {
    title: string;
    value: number;
    color?: string;
}

const Stat: React.FC<StatType> = ({ title, value, color = "text-gray-900" }) => (
    <>
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-700">{title}</h3>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
    </>
);

export default Stat;