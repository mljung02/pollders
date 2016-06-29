import React, { PropTypes } from 'react';
import PollFormComponent from '../components/poll-form-componenet.jsx';

export default class NewPoll extends React.Component {
  static propTypes = {
    folders: PropTypes.array,
    selectedFolderId: PropTypes.number,
    authenticity_token: PropTypes.string,
    error: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedFolderId: this.props.selectedFolderId,
      folders: this.props.folders,
     };
     this.updateFolderId = this.updateFolderId.bind(this)
  }

  get folderOptions() {
    return this.state.folders.map((folder,i) => {
      return (
        <option value={folder.id} key={i}>{folder.name}</option>
      )
    })
  }

  updateFolderId(e){
    this.setState({
      selectedFolderId: e.target.value
    })
  }

  get error() {
    return this.props.error ? (
      <div>{this.props.error}</div>
    ) : null
  }

  render () {
    return (
      <div id="new-poll-form">
        <div class="row" id="folder-overview__top">
          {this.error}
          <label for="folder-select">Folder: </label>
          <select name="folder" id="folder-select"
            defaultValue={this.state.selectedFolderId}
            onChange={this.updateFolderId} >
            {this.folderOptions}
          </select>
          <PollFormComponent
            folderId={this.state.selectedFolderId}
            authenticity_token={this.props.authenticity_token}
             />
        </div>
      </div>
    );
  }
}
