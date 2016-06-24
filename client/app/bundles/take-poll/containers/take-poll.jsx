import React, { PropTypes } from 'react';

export default class TakePoll extends React.Component {
  static propTypes = {
    folder_id: PropTypes.number,
    authenticity_token: PropTypes.string,
    choices: PropTypes.array,
    user_id: PropTypes.number,
    poll_id: PropTypes.number
  };

  constructor(props, context) {
    super(props, context);
  }

  get choices(){
    return this.props.choices.map((choice, i) => {
      return (
        <div className="row" key={i}>
          <input type="radio" id={"choice_"+i} name="choice_id" value={choice.id}/>
          <label for={"choice_"+i}>{choice.content}</label>
        </div>
      )
    })
  }

  get postRoute(){
    return '/polls/'+this.props.user_id+'/'+this.props.folder_id+'/'+this.props.poll_id
  }

  render () {
    return (
      <div id="take-poll">
          <form method="POST" action={this.postRoute}>
            <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
            {this.choices}
            <button>Vote!</button>
          </form>
      </div>
    );
  }
}
