import axios from 'axios';
import React, { Component } from 'react'
import { Card,Row,Col,Button,Modal,Form } from 'react-bootstrap'

export class FavPage extends Component {
constructor(props) {
    super(props)

    this.state = {
         favData:[],
         showFavCards:false,
         name:'',
         img:'',
         show:false,
         id:0,
    }
}
componentDidMount = async () =>{
let url=`http://localhost:8081/getFavData`;
await axios.get(url).then((response)=>{
this.setState({
    favData:response.data,
    showFavCards:true,
})
})
}
//   ------------------------ delete -------------------------

deleteFavData = (e)=>{
let url=`http://localhost:8081/deleteFavData/${e.id}`;
axios.delete(url).then((response)=>{
this.setState({
favData:response.data

})
})
}
//  ---------------------------- for update data ----------------------------------------------
// updateName=(e=>this.setState({name:e.target.value}))
// updateImg=(e=>this.setState({img:e.target.value}))


updateForm = (idx)=>[
this.setState({

    show:true,
    name:idx.name,
    img:idx.img,
    id:idx._id
})

]

handleClose = () => {
    this.setState({show:false})}




    updateDrink = async (event) => {
        event.preventDefault();
    
        const object = {
          id: this.state.id,
          name: event.target.name.value,
          img: event.target.img.value,
        };
        let Url = `http://localhost:8081/updateFavData/${event.id}`;
        // let Url = `https://exam-back-saadoun.herokuapp.com/updateDrink`;
        axios.put(Url, object).then((result) => {
            this.setState({
              favData: result.data,
              show: false,
            });
          })
          .catch((err) => {
            console.log("bad requiest ", err);
          });
      };






    render() {
        console.log(this.state);
        return (
            <>
            
{
    this.state.show &&
    

    <Modal show={this.state.show} onHide={this.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Drinks Modal </Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <Form onSubmit={this.updateDrink}>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Drink Name</Form.Label>
    <Form.Control type="text" defaultValue={this.state.name} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Drink img</Form.Label>
    <Form.Control type="text" defaultValue={this.state.img} />
  </Form.Group>
  <Button as="input" type="submit" value="Submit" />

</Form>

    </Modal.Body>
    <Modal.Footer>

      <Button variant="secondary" onClick={ this.handleClose}> Close </Button>
    </Modal.Footer>
  </Modal>

    // <form>
    //     <input type='text' value={this.state.name} onChange={this.updateName}/>
    //     <input type='text' value={this.state.img} onChange={this.updateImg}/>
    //     <input type='submit' value='update' />

    // </form>


}

<Row>
{
    this.state.showFavCards &&
    this.state.favData.map((item,idx)=>{
        return (

            <Col key={idx}>

                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.img} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Button variant="primary" onClick={() => this.deleteFavData(item)}>delete</Button>
                        <Button variant="primary" onClick={() => this.updateForm(item)}>update</Button>

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

export default FavPage
