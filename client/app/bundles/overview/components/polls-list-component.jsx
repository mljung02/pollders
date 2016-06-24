import React, { PropTypes } from 'react';

export default class PollsListComponent extends React.Component {
  static propTypes = {
    polls: PropTypes.array.isRequired,
    folderName: PropTypes.string.isRequired,
    newPollPath: PropTypes.string.isRequired,
    folder_id: PropTypes.number.isRequired,
    user_id: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  get titleLine(){
    return this.props.folderName + ' (' + this.props.polls.length + ')'
  }

  get polls(){
    return this.props.polls.map((poll,i) => {
      const unseenCount = poll.unseen_responses > 0 ? (<i> ({poll.unseen_responses} new)</i>) : null
      return (<div className="row" key={i}>
        <div className="col-md-8">
          <a href={this.viewPollUrl(poll.id)}>{poll.question}</a>
        </div>
        <div className="col-md-4 right">
          {poll.responses}{unseenCount}
        </div>
      </div>
      )
    })
  }

  viewPollUrl(poll_id){
    return '/polls/'+this.props.user_id+'/'+this.props.folder_id+'/'+poll_id
  }

  get pollHeader(){
    return (
      <div className="row">
        <div className="col-md-8">
          <b>Question</b>
        </div>
        <div className="col-md-4 right">
          <b>Responses</b>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div id="folder-overview">
        <h1 id="overview-title">{this.titleLine}</h1>
        <a href={this.props.newPollPath} id="new-poll">+ Create New Poll</a>
        <hr />
        {this.pollHeader}
        {this.polls}
      </div>
    );
  }
}
