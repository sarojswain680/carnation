import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { floorArr, floorArr1 } from '../Constant';


class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: floorArr,
            data1: floorArr1,
            downArr: [],
            upArr: []
        };
    }

    sortData = (data) => {
        data.sort(function (a, b) {
            if (a.button < b.button) { return -1; }
            if (a.button > b.button) { return 1; }
            return 0;
        })
    }

    onPress = (type, item, index) => {
        const { downArr } = this.state

        if (type === 'Down') {
            const newObj = {
                name: item.name,
                button: 'Down',
                index: index,
                backgroundColor: 'green'
            }
            downArr.push(newObj)
        } else {
            const newObj = {
                name: item.name,
                button: 'Up',
                index: index,
                backgroundColor: 'green'
            }
            downArr.push(newObj)
        }
    }

    renderFloor = ({ item, index }) => {
        return (
            <View key={index} style={style.cardView}>
                <View style={[style.elevatorView, { backgroundColor: item.backgroundColor ? item.backgroundColor : '#FFFFFF' }]} />
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
    onCall = (index, item) => {
        const { data } = this.state;
        const newObj = {
            name: item.name,
            button: item.button,
            index: index,
            backgroundColor: 'green'
        }
        data.push(newObj)
        const arr1 = this.getUniqueListBy(data, 'name')
        this.setState({ data: arr1 })
    }

    onSubmit = () => {
        const { downArr } = this.state;
        const newDownArr = this.sortData(downArr)
        this.setState({ downArr: newDownArr })

        downArr.map((item, index) => {
            const repeater = setInterval(() => { this.onCall(index, item) }, 1000)
            setTimeout(() => { clearInterval(repeater) }, 5000);
        })
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
