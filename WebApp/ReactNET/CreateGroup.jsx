var GroupSettings = React.createClass({
  componentDidMount: function () {
    $.ajax({
      url: this.props.url,
      success: this.successHandler
    })
  },
  getInitialState: function () {
    return {
      options: [],
      groupName: ''
    }
  },
  successHandler: function (data) {
    this.state.options = [];
    this.state.tutor = data[0].TutorID;
    for (var i = 0; i < data.length; i++) {
      var option = data[i];
      this.state.options.push(
        <option key={i} value={option.TutorID}>{option.Name}</option>
      );
    }
    this.forceUpdate();
  },
  handleTutorChange: function (event) {
    event.preventDefault();
    this.setState({ tutor: event.target.value });
  },
  handleGroupNameChange: function (event) {
    this.setState({ groupName: event.target.value });
  },
  render: function () {
    return (
      <div className="group-settings">
        <div className="form-group">
          <div>
            <label htmlFor="tutorName" className="col-md-2">Преподаватель:</label>
          </div>
          <div className="col-md-10">
            <select name="tutorname__select" className="form-control" id="tutorName" onChange={this.handleTutorChange}>
              {this.state.options}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="groupName" className="col-md-2">Название учебной группы:</label>
          </div>
          <div className="col-md-10">
            <input id="groupName" className="form-control" type="text" onChange={this.handleGroupNameChange} />
          </div>
        </div>
        <div className="form-group ">
          <div className="col-md-offset-2 col-md-10">
            <button className="btn btn-default ">Создать учебную группу</button>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <GroupSettings url="/Groups/GetTutors" actionLink="/Groups/AddGroup" />,
  document.getElementById('content')
);