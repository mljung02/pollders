import React, { PropTypes } from 'react';
import AddFolderComponent from '../components/add-folder-component';
import PollsListComponenet from '../components/polls-list-component';

export default class Overview extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    folders: PropTypes.array.isRequired,
    polls: PropTypes.array.isRequired,
    user_id: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: this.props.username,
      folders: this.props.folders,
      selectedFolder: 0,
     };
    this.folderCreationAjax = this.folderCreationAjax.bind(this)
    this.selectFolder = this.selectFolder.bind(this)
  }

  folderCreationAjax(folder_name) {
    $.post(this.updatePath, {folder_name: folder_name}, (data)=>{

      this.setState({folders: data.folders, folderName: folder_name})
    })
  }

  selectFolder(index) {
    this.setState({selectedFolder: index})
  }

  get updatePath(){
    return "/users/" + this.props.user_id + "/folders"
  }

  get selectedFolderPolls(){
    let folderPolls
    if (!this.props.polls[0] || this.props.polls[0].length === 0){
      return []
    }
    const folderId = this.selectedFolderId
    this.props.polls.forEach(pollArray => {
      if (pollArray[0] && pollArray[0].folder_id === folderId) {
        folderPolls = pollArray
      }
    })
    return folderPolls
  }

  get newPollPath(){
    return "/folders/" + this.selectedFolderId + "/polls/new"
  }

  get selectedFolderId() {
    return this.state.folders[this.state.selectedFolder].id
  }

  get folders(){
    return this.state.folders.map((e,i)=> {
      return i === this.state.selectedFolder ? (
        <div className="folder selected-folder" key={i}>{e.name}</div>
      ) : (
        <div className="folder" onClick={()=>{this.selectFolder(i)}} key={i}>{e.name}</div>
      )
    })
  }

  get currentFolderName(){
    return this.state.folders.map((e) => {
      return e.name
    })[this.state.selectedFolder]
  }

  get titleLine(){
    return this.props.username + "'s pollders (" + this.state.folders.length + ")"
  }

  render () {
    return (
      <div id="folder-overview">
        <div class="row" id="folder-overview__top">
          <h1 id="overview-title">{this.titleLine}</h1>
            <AddFolderComponent
              folderCreationAjax={this.folderCreationAjax}
              handleFolderNameChange={this.handleFolderNameChange}
              authenticity_token={this.props.authenticity_token}
              user_id={this.props.user_id}
              />
          <hr />
          {this.folders}
        </div>
          <div class="row" id="folder-overview__bottom">
            <PollsListComponenet
              folderName={this.currentFolderName}
              newPollPath={this.newPollPath}
              polls={this.selectedFolderPolls}
              folder_id={this.selectedFolderId}
              user_id={this.props.user_id}
              />
          </div>
      </div>
    );
  }
}
