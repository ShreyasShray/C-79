import * as React from 'react';
import {
    Header
} from 'react-native-elements'

const MyHeader =( props)=>{
    return(
        <Header
            centerComponents={{text:props.title, style:{color:"blue", fontSize:20, fontWieght:'bold', textAlign:'center'}}}
            backgroundColor="yellow"
        ></Header>
    );
}

export default MyHeader