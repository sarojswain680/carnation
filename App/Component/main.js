import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { floorArr } from '../Constant';


class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: floorArr,
            downArr: [],
            upArr: [],
            activeIndex: 7
        };
    }

    onPress = (type, item, index) => {
        const { downArr, upArr } = this.state

        if (type === 'Down') {
            const newObj = {
                name: item.name,
            }
            downArr.push(newObj)
        } else {
            const newObj = {
                name: item.name,
            }
            upArr.push(newObj)
        }
    }

    renderFloor = ({ item, index }) => {
        return (
            <View key={index} style={style.cardView}>
                {
                    item.active ?
                        <View style={style.elevatorView} />
                        :
                        null
                }
                <TouchableOpacity style={style.floorView} onPress={() => this.onPress('Down', item, index)}>
                    <MaterialCommunityIcons name="arrow-down-bold" color={"black"} size={30} />
                    <Text style={style.floorText}>{`Lift floor ${item.name}`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.floorView} onPress={() => this.onPress('Up', item, index)}>
                    <MaterialCommunityIcons name="arrow-up-bold" color={"black"} size={30} />
                    <Text style={style.floorText}>{`Lift floor ${item.name}`}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    getUniqueListBy = (arr, key) => {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }


    onSubmit = () => {
        const { downArr, upArr, data } = this.state;
        const newDownArr = downArr.sort((a, b) => a.name - b.name)
        const newUparr = upArr.sort((a, b) => a.name - b.name)

        let orderList = []


        newDownArr.forEach((el, index) => {
            orderList.push(el)
            const newObj = {
                name: el.name,
                active: true
            }
            data.push(newObj)
            const arr1 = this.getUniqueListBy(data, 'name')
            this.setState({ data: arr1 })
        });

        newUparr.forEach((el, index) => {
            orderList.push(el)
            const newObj = {
                name: el.name,
                active: true
            }
            data.push(newObj)
            const arr1 = this.getUniqueListBy(data, 'name')
            this.setState({ data: arr1 })
        })


        const arr = this.getUniqueListBy(data, 'name')

        this.setState({ downArr: [], upArr: [], data: arr })

        let orderOfExecution = '';

        orderList.forEach((el) => {
            orderOfExecution += `${el.name} => `
        })

        this.props.navigation.navigate("ExecView", { exec: orderOfExecution })


    }

    render() {
        const { data } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <FlatList
                        keyExtractor={(index) => index.toString()}
                        data={data}
                        style={{ flex: 1 }}
                        renderItem={(item, index) => this.renderFloor(item, index)}
                    />
                    <TouchableOpacity style={style.buttonView} onPress={() => this.onSubmit()}>
                        <Text style={style.buttonText}>{"Start run"}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView >
        );
    }
}

export default MainScreen;


const style = StyleSheet.create({
    cardView: {
        height: 95,
        width: 335,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    elevatorView: {
        height: 95,
        width: 105,
        backgroundColor: 'green',
    },
    floorView: {
        height: 95,
        width: 105,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'red'
    },
    floorNumber: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 28
    },
    floorText: {
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 28,
        marginHorizontal: 5
    },
    buttonView: {
        width: 315,
        height: 50,
        borderRadius: 31,
        backgroundColor: '#3580D5',
        marginHorizontal: 20,
        marginVertical: 10
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
        justifyContent: 'center',
        lineHeight: 22,
        color: '#FFFFFF',
        marginVertical: 15
    }
})
