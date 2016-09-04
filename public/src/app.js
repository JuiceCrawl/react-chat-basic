import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


class CommentForm extends Component{
  render (){
    return (
      <form style={{margin:50}} onSubmit={this.onMessageSubmit}>
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
    console.log(this.state)
         
  }

  handleMessageSubmit(e){
    e.preventDefault();

    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.setState({author: '', text: ''});
    console.log(this.state)
  }

  render (){
    return (
      <div className="container" style={{margin:50}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <CommentList comments={this.state.comments}/>
            <CommentForm onMessageSubmit={this.handleMessageUpdate.bind(this)} onMessageUpdate={this.handleMessageUpdate.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(<CommentBox/>, document.getElementById('app'))