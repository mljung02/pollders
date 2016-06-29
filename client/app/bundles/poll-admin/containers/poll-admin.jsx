import React, { PropTypes } from 'react';

export default class PollAdmin extends React.Component {
  static propTypes = {
    user_id: PropTypes.number,
    folder_id: PropTypes.number,
    poll: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
  }

  get choices(){
    const { poll: {responses}, choices } = this.props

    return choices.map((choice, i) => {
      const votes = choice.votes
      const style = this.graphStyling(votes, responses)
      return (
          <div className="row poll-admin__choice" key={i}>
            <div className="col-md-2">
              {choice.content}
            </div>
            <div className="col-md-8">
              <span style={style.bar}></span>
            </div>
            <div className="col-md-2">
              <span style={style.text}>{this.voteDisplay(votes, responses)}</span>
            </div>
          </div>
      )
    })
  }

  voteDisplay(votes, responses){
    const percentage = responses > 0 ? ' ' + Math.round((100*votes/responses)) + '%' : ''
    return votes.toString() + '/' + responses + percentage
  }

  get topVotes(){
    const {choices} = this.props
    return choices.map(choice => choice.votes).sort()[choices.length-1]
  }

  graphStyling(votes, responses){
    const barWidth = responses === 0 ? '0%' : (100 * votes/this.topVotes).toString() + '%'
    const color = responses === 0 ? 'white' : 'darkgrey'
    return {
      bar: {
        backgroundColor: color,
        padding: '.2rem',
        width: barWidth,
        display: 'inline-block',
      },
      text: {
        textAlign: 'left'
      }
    }
  }

  get question(){
    return this.props.poll.question
  }

  get takeURL(){
    return 'http://localhost:3000/polls/'+this.props.user_id+'/'+this.props.folder_id+'/'+this.props.poll.id+'/take'
  }

  render () {
    return (
      <div id="poll-admin">
          {this.choices}
      </div>
    );
  }
}
