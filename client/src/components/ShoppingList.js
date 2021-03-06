import React, {Component} from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getItems, deleteItem} from '../actions/itemActions'
import PropTypes from 'prop-types'
import EditItem from './EditItem'

class ShoppingList extends Component{


componentDidMount(){
    this.props.getItems()
}


static propTypes={
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}
onDeleteClick=(id)=>{
    this.props.deleteItem(id)
    console.log("State after"+this.props.item)
}
    render(){
    
        const {items}=this.props.item;

    const displayList=items.map(({_id,name},index)=>(
            <CSSTransition key={index} timeout={500} classNames='fade'>
                <ListGroupItem>
                {this.props.isAuthenticated? <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={() => {if(window.confirm('Delete the item?')){this.removeToCollection(_id)};}}
                    >
                      &times;
                    </Button>: ''}

                    {name}
                    <EditItem clickedItemID={_id} ></EditItem>
                </ListGroupItem>
                </CSSTransition>
   ))


        return(
                <Container>

                        {/* Display items */}
                        <ListGroup>
                            <TransitionGroup className="shopping-list">
                    {displayList}
                            </TransitionGroup>
                        </ListGroup>
                </Container>
        )
    }

}



const mapStateToProps=(state)=>({
    item: state.item, //same as the reducer.
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{getItems, deleteItem})
(ShoppingList);

//Those will become accessable through:
//this.props.deleteItem
//this.props.getItems