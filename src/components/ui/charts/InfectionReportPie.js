import {PieChart, Pie, Cell, Legend, Label, Tooltip} from 'recharts';
import palette from '../../../stylesheets/ui.scss'


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
}

const InfectionReportPie = ({infected, nonInfected}) => {
  const data = [{name: 'Healthy', value: nonInfected},
  {name: 'Infected', value: infected}];
  return(
    <PieChart width={250} height={250}>
      <Pie data={data} cx={125} cy={100} outerRadius={80} dataKey="value"
        fill="#8884d8" >
        <Cell fill={palette.primary_color_dark} />
        <Cell fill={palette.accent_color_dark} />

        <Label />
      </Pie>
      <Legend layout="vertical" align="center" verticalAlign="bottom"/>
      <Tooltip formatter={(value) => `${value*100}%`}/>
     </PieChart>
  );
}

export default InfectionReportPie;
