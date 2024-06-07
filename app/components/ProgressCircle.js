import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import globalColors from '../styleFile/globalColors';

const ProgressCircle = ({ chartData }) => {

    let progress = chartData.data;
    let radius = 40;
    let color = "#777";
    let backgroundColor = globalColors.backgroundGray;
    // let color = globalColors.blue
    // let backgroundColor = globalColors.backgroundBlue

    let circleWidth = 3.5;

    const percentage = Math.round(progress * 100);

    const data = [
        { x: 'Complete', y: progress * 100 },
        { x: 'Remaining', y: 100 - progress * 100 },
    ];

    return (
        <View style={{ alignItems: 'center' }}>
            <VictoryPie
                data={data}
                colorScale={[(percentage == 100 ? globalColors.gold : color), backgroundColor]}
                innerRadius={radius - circleWidth}
                radius={radius}
                labels={() => null}
                height={90}
                width={90}

            />
            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 18 }}>
                    {`${percentage}%`}
                </Text>
            </View>
        </View>
    );
};

export default ProgressCircle;
