
// Client side rendering
//_____________________________________________________________

const GROUP_NAME_LENGTH_ERROR_MESSAGE = 'Название группы может быть не менее 1 и не более 50 символов';
const DATABASE_ERROR_MESSAGE = 'Ошибка при добавленни записи в бд';

var GroupSettings = React.createClass({
  componentDidMount: function () {
    // Get tutors
    $.ajax({
      url: this.props.url,
      success: this.successHandler
    });
  },
  getInitialState: function () {
    return {
      options: [],
      groupName: '',
      errorMessage: ''
    }
  },
  /**
   * Handler that recieves data about tutors
   * and updates options state
   */
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
    var value = event.target.value;
    var $parent = $(event.target.parentNode.parentNode);
    // Add or remove error state
    var state = (value.length < 1 || value.length > 50);
    $parent[state ? 'addClass' : 'removeClass']('has-error');
    this.setState({ errorMessage: state ? GROUP_NAME_LENGTH_ERROR_MESSAGE : '' });
    // Remove group name
    this.setState({ groupName: event.target.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var tutor = this.state.tutor;
    var name = this.state.groupName.trim();

    if (tutor == null || !name || name.length < 1 || name.length > 50) {
      this.setState({ errorMessage: GROUP_NAME_LENGTH_ERROR_MESSAGE });
      return;
    }
    // TODO: send request to the server
    $.ajax({
      method: "POST",
      type: "POST",
      url: this.props.actionLink,
      data: {
        TutorID: tutor,
        GroupName: name
      },
      success: function (data) {
        // Redirect to main page
        if (data.result = "Success") {
          window.location = "./Edit/" + data.payload.GroupID;
        } else {
          // ToDo: Mistake Handler
          console.log(data);
        }
      },
      error: function () {
        // Error message
        this.setState({ errorMessage: DATABASE_ERROR_MESSAGE });
        $('.group-settings .alert.alert-danger').show();
      }
    });

    this.setState({ groupName: '' });
  },
  render: function () {
    return (
      <form className="group-settings">
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
        <div className="form-group has-feedback">
          <div>
            <label htmlFor="groupName" className="col-md-2">Название учебной группы:</label>
          </div>
          <div className="col-md-10">
            <input id="groupName" className="form-control" type="text" onChange={this.handleGroupNameChange} required />
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button className="btn btn-default " onClick={this.handleSubmit}>Создать учебную группу</button>
          </div>
        </div>
        {this.state.errorMessage.length > 0 &&
          <div className="alert alert-danger fade in">
            {this.state.errorMessage}
          </div>
        }
      </form>
    );
  }
});

// Client side rendering
ReactDOM.render(
  <GroupSettings url="./GetTutors" actionLink="./AddGroup" />,
  document.querySelector('#content')
);