import React, { Component, Fragment } from "react"
import { Comment, Divider, Segment } from "semantic-ui-react"
import CommentComponent from './Comment'
import { connect } from "react-redux"


class Comments extends Component {

  render() {

    const { comments } = this.props

    return (
      <div>
        <Segment raised>
          { comments
            && comments.length > 0
            ? comments.map((comment, idx) => (
              <Comment.Group key={idx}>
                <Fragment>
                  <CommentComponent comment={comment} />
                  { comments[idx+1] ? <Divider /> : '' }
                </Fragment>
              </Comment.Group>
            ))
            :
            <p>No comments for this post.</p>
          }
        </Segment>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments: Object.values(comments)
  }
}

export default connect(mapStateToProps)(Comments)
