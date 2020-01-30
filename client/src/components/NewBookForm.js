import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBook,updateBook } from '../actions/bookActions';
import { clearErrors } from '../actions/errorActions';
import { Redirect } from "react-router-dom"

class NewBookForm extends Component {
    state = {
        title: ''
        , author: ''
        , ISBN: ''
        , description: ''
        //  , img_src: ''
        , publish_year: ''
        , language: ''
        , publisher: ''
        , category: ''
        , quantity: ''
        , message: null,
        addStatus: ''
    };

    componentDidMount(){
        console.log(this.props.location.type)
        if(this.props.location.type==='Edit'){
            const currentBook=this.props.location.currentBook
            console.log(currentBook.title)

        this.setState({
            title: currentBook.title
            , author: currentBook.author
            , ISBN: currentBook.ISBN
            , description: currentBook.description
            //  , img_src: ''
            , publish_year: currentBook.publish_year
            , language: currentBook.language
            , publisher: currentBook.publisher
            , category: currentBook.category
            , quantity: currentBook.quantity
        })
        }
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addBook: PropTypes.func.isRequired,
        updateBook: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'ADD_FAILED') {
                this.setState({ message: error.message.message });
                console.log(error)
            } else {
                this.setState({ message: null });
            }
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { title, author, ISBN, description, publish_year, language, publisher, category, quantity } = this.state;

        const book = {
            title, author, ISBN, description, publish_year, language, publisher, category, quantity
        }
        //attempt top login
        if(this.props.location.type==='Edit'){
            this.props.updateBook(this.props.location.currentBook._id,book)

        }
        else{
            this.props.addBook(book)

        }

        this.setState({
            addStatus: 'added'

        })

      

        window.location.href = "/"

        
    };

    componentDidUpdate(){
       return <Alert color='success'>Successfully Added a new book!</Alert>
    }

    render() {
        if(this.props.location.type===undefined){
             return <Alert color='danger'>Sorry, something went wrong</Alert>
            // window.location.href = "/"


            
        }
        return (
            
            <div>
                {this.props.isAuthenticated?
            <div>
                
                {this.state.message ? (
                    <Alert color='danger'>{this.state.message}</Alert>
                ) : null}

 
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for='title'>Title</Label>
                        <Input
                            type='title'
                            name='title'
                            id='title'
                            placeholder='Book Title'
                            value={this.state.title}
                            className='mb-3'
                            onChange={this.onChange}
                            required 
                        />

                        <Label for='author'>Author</Label>
                        <Input
                            type='author'
                            name='author'
                            id='author'
                            placeholder='Book Author'
                            value={this.state.author}
                            className='mb-3'
                            onChange={this.onChange}
                            required
                        />

                        <Label for='ISBN'>ISBN</Label>
                        <Input
                            type='number'
                            name='ISBN'
                            id='ISBN'
                            placeholder="Book's ISBN"
                            value={this.state.ISBN}
                            className='mb-3'
                            onChange={this.onChange}
                            required
                        />

                        <Label for='description'>Description</Label>
                        <Input
                            type='description'
                            name='description'
                            id='Description'
                            placeholder="About the Book"
                            value={this.state.description}
                            className='mb-3'
                            onChange={this.onChange}
                            required
                        />
                        <Label for='publish_year'>Publish Year</Label>

                        <Input
                            type='publish_year'
                            name='publish_year'
                            id='publish_year'
                            placeholder="Year"
                            value={this.state.publish_year}
                            className='mb-3'
                            onChange={this.onChange}
                            required
                        />
                        <Label for='language'>Language</Label>

                        <Input
                            type='language'
                            name='language'
                            id='language'
                            placeholder="Language"
                            value={this.state.language}
                            className='mb-3'
                            onChange={this.onChange}
                            required
                        />

                        <Label for='publisher'>Publisher</Label>

                        <Input
                            type='publisher'
                            name='publisher'
                            id='publisher'
                            placeholder="Book Publisher"
                            value={this.state.publisher}
                            className='mb-3'
                            onChange={this.onChange}
                            required
                        />

                        <Label for='category'>Category</Label>

                        <Input
                            type='category'
                            name='category'
                            id='category'
                            placeholder="Category"
                            value={this.state.category}
                            className='mb-3'
                            onChange={this.onChange}
                            required
                        />

                        <Label for='quantity'>Quantity</Label>

                        <Input
                            type='number'
                            name='quantity'
                            id='quantity'
                            placeholder="Quantity"
                            value={this.state.quantity}
                            className='mb-3'
                            onChange={this.onChange}
                            required
                        />
                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                            Submit
                </Button>
                    </FormGroup>
                </Form>

            </div>
            : <Alert color='danger'>Sorry, you're not authorized to view this page</Alert>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { addBook, updateBook, clearErrors }
)(NewBookForm);