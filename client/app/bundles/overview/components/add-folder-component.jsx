import React, { PropTypes } from 'react';

export default class AddFolderComponent extends React.Component {
  static propTypes = {
    user_id: PropTypes.string.isRequired,
    folderCreationAjax: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { showForm: false, folderName: '' }
    this.handleClick = this.handleClick.bind(this)
    this.handleFolderNameChange = this.handleFolderNameChange.bind(this)
    this.createFolder = this.createFolder.bind(this)
  }

  createFolder(e) {
    e.preventDefault()
    this.props.folderCreationAjax(this.state.folderName)
    this.setState({ showForm: false, folderName: '' })
  }

  handleFolderNameChange(e) {
    this.setState({ folderName: e.target.value })
  }

  get folderForm(){
    return (
      <span id="add-folder__form">
        <div>
          <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
          <input type="text" name="folder_name" onChange={this.handleFolderNameChange}/>
        </div>
        <div>
        <button onClick={this.createFolder}>Create Folder</button>
        </div>
      </span>
    )
  }

  get addFolder(){
    return (
      <span onClick={this.handleClick}>
        + Add Folder
      </span>
    )
  }

  get newFolderDisplay(){
    return this.state.showForm ? this.folderForm : this.addFolder
  }

  handleClick(event){
    this.setState( {showForm: true} )
  }

  render () {
    return (
      <div id="add-folder__container">
        {this.newFolderDisplay}
      </div>
    );
  }
}
