import axios from 'axios'
import React, { Component } from 'react'
import { Card,Row,Col,Button } from 'react-bootstrap'

export class HomePage extends Component {

constructor(props) {
    super(props)

    this.state = {
         apiData:[],
         showCard:false,
    }
}
//  ------------ get api data from back ------------
componentDidMount = async() =>{
let url='http://localhost:8081/getApiData';
await axios.get(url).then((response)=>{
    this.setState({
        apiData:response.data,
        showCard:true,
    })
})
}

// ----------------- add to fav --------------------------
addToFav = (item)=>{
let url='http://localhost:8081/addToFav'
let reqBody={
    name:item.strDrink,
    img:item.strDrinkThumb,
}
axios.post(url,reqBody).then((response)=>{
console.log(response.data);
})
}




    render() {
        console.log(this.state);
        return (
            <>
            <Row>
                {
                this.state.showCard &&
                this.state.apiData.map((item,idx)=>{
                    return(
                        <Col key={idx}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.strDrinkThumb} />
                                <Card.Body>
                                    <Card.Title>{item.strDrink}</Card.Title>
                                    <Button variant="primary" onClick={()=>this.addToFav(item)}>add to fav</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                    )

                })
                }
                </Row>
            </>
        )
    }
}

export default HomePage
