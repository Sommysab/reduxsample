import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { fetchPosts } from '../actions/postActions';


import PropTypes from 'prop-types';

class Posts extends Component {  
    
    UNSAFE_componentWillMount() {
        this.props.fetchPosts();
    }
        
    UNSAFE_componentWillReceiveProps(nextProps){ 
        if(nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }    

    render() {
        const postItems = this.props.posts.map(post => ( 
            <div key={post.id}>
                <h3 style={{fontSize:'12px'}}>{post.title}</h3>
                <p style={{fontSize:'12px'}}>{post.body} </p>
            </div>
        ));

        return (
            <div>
                <h1>Posts</h1>
                {postItems}
            </div>
        )
    }
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({ 
    posts: state.posts.items,
    newPost: state.posts.item
})

export default connect(mapStateToProps, { fetchPosts })(Posts);
