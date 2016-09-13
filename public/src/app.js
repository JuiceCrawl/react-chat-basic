import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


class CommentForm extends Component{
  render (){
    return (
      <form style={{margin:50}} onSubmit={this.props.onMessageSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input className="form-control" type="text" placeholder="your name" id="author" onChange={this.props.onMessageUpdate}/>
          <label>Message:</label>
          <input className="form-control" type="text" placeholder="say something..." id="message" onChange={this.props.onMessageUpdate} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

class CommentList extends Component{


  render (){

    var commentList = this.props.comments.map((comment)=>{
      return(
        <p key={comment.id}><strong>{comment.author}:</strong> {comment.message} </p>
      )
    })
    
    return (
      <div>
        {commentList}
      </div>
      
    )
  }
}

class CommentBox extends Component{
  
  constructor(props) {
    super(props);

    this.handleMessageUpdate = this.handleMessageUpdate.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)

    this.state = {
      author: '',
      message: '',
      comments: []
    }
  }
  
  componentDidMount(){   
    axios.get('/api/comments')  
    .then((messages)=>{
      this.setState({
        comments: messages.data
      })
    })
    .catch((e)=> console.log('Error in getting comments from db ', e))  
  }

  handleMessageUpdate(e){
    var value = e.target.value

    if(e.target.id === 'author'){
      this.setState({
        author: value
      })
    }
    if(e.target.id === 'message'){
      this.setState({
        message: value
      }) 
    }
         
  }

  handleMessageSubmit(e){
    e.preventDefault();

    var author = this.state.author
    var message = this.state.message
    var comments = this.state.comments

    if (!author || !message) {
      return;
    }

    axios.post('/api/comments', {
      author: author,
      message: message
    })
    .then(()=>{
      var newComments = comments.concat({author: author, message: message})
      this.setState({
        author: '', 
        message: '',
        comments: newComments
      })
    })
    .catch((e)=> console.log('Error in posting comments to db ', e))   
    
  }

  render (){
    return (
      <div className="container" style={{margin:50}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <CommentList comments={this.state.comments}/>
            <CommentForm onMessageSubmit={this.handleMessageSubmit} onMessageUpdate={this.handleMessageUpdate}/>
          </div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(<CommentBox/>, document.getElementById('app'))