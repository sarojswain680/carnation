import React from 'react';
import { SafeAreaView, Text } from 'react-native';


class ExecScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.props.route.params.exec}</Text>
            </SafeAreaView >
        );
    }
}

export default ExecScreen;

