import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import ListItem from 'react-native-elements'

export default class BookDonateScreen extends React.Component{
    constructor(){
        super();
        this.state={
            requestedBooksList:[]
        },
        this.requestRef = null
    }
    getRequestedBookList=async()=>{
        this.requestRef=db.collection("book_request").onSnapshot((snapshot)=>{
            var requestedBooksList=snapshot.docs.map((document)=>{
                document.data()
            });
            this.setState({requestedBooksList:requestedBooksList})
        })
    }
    componentDidMount=async()=>{
        this.getRequestedBookList();
    }
    componentWillUnmount=async()=>{
        this.requestRef()
    }
    keyExtractor=(items, index)=>{index.toStrings()}
    renderItem=({item, i})=>{
        return(
            <ListItem key={i} title={item.book_name} subtitle={item.reason_to_request} titleStyle={{color:'black', fontWieght:'bold', }}rightElement={<TouchableOpacity style={{width:100, backgorundColor:'skyblue'}}><Text style={{}}>View</Text></TouchableOpacity>} bottomDivider>
                
            </ListItem>
        );
    }
    render(){
        return(
            <View>
                <FlatList keyExtractor={this.keyExtractor} data={this.state.requestedBooksList} renderItem={(this.renderItem)}></FlatList>
            </View>
        );
    }
}