import React, { PropTypes } from 'react';

export default class PollFormComponent extends React.Component {
  static propTypes = {
    folderId: PropTypes.number,
    authenticity_token: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      choiceCount: 2,
    }
    this.addChoice = this.addChoice.bind(this)
  }

  get choices() {
    let choiceArray = []
    for (var i = 0; i < this.state.choiceCount; i++) {
      choiceArray.push(this.choiceInput(i))
    }
    return choiceArray
  }

  get addChoiceButton(){
    return (
      <div id="add-choice-button">
        <span>{this.state.choiceCount}/20</span>
        <button type="button" onClick={this.addChoice}>+ Add Choice</button>
      </div>
    )
  }

  choiceInput(i) {
    return (
      <div key={i}>
        <label for={"choice["+i+"]"}>Choice {i+1}:</label>
        <input type="text" id={"choice["+i+"]"} name={"choices[]"} />
      </div>
    )
  }

  addChoice(){
    if (this.state.choiceCount < 20) {
      this.setState({
        choiceCount: this.state.choiceCount + 1
      })
    }
  }

  render () {

    return (
      <form id="choices-component" method="POST" action="/polls/create">
        <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
        <input type="hidden" value={this.props.folderId} name="folder_id"/>
        <label for="question-input">Question: </label>
        <input type="text" name="poll[question]" id="question-input"/>
        <label for="poll-close">Closes On:</label>
        <input id="poll-close" type="date" placeholder="Poll Closure Date" name="poll[expiration]" />
        <hr />
        {this.choices}
        {this.addChoiceButton}
        <button type="submit">CREATE POLL</button>
      </form>
    )
  }
}
