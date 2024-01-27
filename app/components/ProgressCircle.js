// import React from 'react';
// import { Text, View } from 'react-native';
// import { ProgressCircle as ProgressCircleSVG } from 'react-native-svg-charts';

// export default function ProgressCircle({ chartData }) {

//     let progress = chartData.data
//     let radius = 40
//     const percentage = `${Math.round(progress * 100)}%`;
//     // let color = 'rgb(134, 65, 244)'
//     let color = '#008ffb'
//     let backgroundColor = '#008ffb25'
//     let strokeWidth = 8

//     return (
//         <View style={{ alignItems: 'center' }}>

//             {/* <ProgressCircle style={{ height: 200 }} progress={0.7} progressColor={'rgb(134, 65, 244)'} /> */}
//             <ProgressCircleSVG
//                 style={{ height: radius * 2, width: radius * 2 }}
//                 progress={progress}
//                 progressColor={color}
//                 strokeWidth={strokeWidth}
//                 backgroundColor={backgroundColor}
//             />

//             <Text style={{ position: 'absolute', textAlign: 'center', lineHeight: radius * 2, color: 'black', fontSize: 16 }}>
//                 {percentage}
//             </Text>
//         </View>
//     )
// };

import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

const ProgressCircle = ({ chartData }) => {

    let progress = chartData.data
    let radius = 40
    // let color = 'rgb(134, 65, 244)'
    let color = '#008ffb'
    let backgroundColor = '#008ffb25'
    let strokeWidth = 8
    
    const percentage = Math.round(progress * 100);

    const data = [
        { x: 'Complete', y: progress * 100 },
        { x: 'Remaining', y: 100 - progress * 100 },
    ];

    return (
        <View style={{ alignItems: 'center' }}>
            <VictoryPie
                data={data}
                colorScale={[color, backgroundColor]}
                innerRadius={radius - 10}
                radius={radius}
                labels={() => null}
                height={90}
                width={90}

            />
            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 16 }}>
                    {`${percentage}%`}
                </Text>
            </View>
        </View>
    );
};

export default ProgressCircle;
