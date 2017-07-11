// Server side rendering
//_____________________________________________________________

const GROUP_NAME_LENGTH_ERROR_MESSAGE = 'Название группы может быть не менее 1 и не более 50 символов';
const SUCCESS_UPDATE_MESSAGE = "Запись успешно обновлена";

var Alert = React.createClass({
  componentDidMount: function () {
    this.$alert = $('.react-alert');
  },
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== this.props.message) {
      this.$alert.fadeIn();
      this.forceUpdate();
      var self = this;
      setTimeout(function () {
        self.$alert.fadeOut();
      }, this.props.time);
    }
  },
  render: function () {
    return (
      <div style={{display: 'none'}} className="alert alert-success react-alert">
        {this.props.message}
      </div>
    );
  }
});


var EditGroup = React.createClass({
  getInitialState: function () {
    return {
      info: this.props.info,
      groupName: this.props.info.GroupName,
      errorMessage: ''
    }
  },
  handleGroupNameChange: function (event) {
    var value = event.target.value;
    var $parent = $(event.target.parentNode.parentNode);
    // Check for error
    var state = (value.length < 1 || value.length > 50);
    $parent[state ? 'addClass' : 'removeClass']('has-error');
    this.setState({ errorMessage: state ? GROUP_NAME_LENGTH_ERROR_MESSAGE : '' });

    // Update groupName
    this.setState({ groupName: event.target.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var name = this.state.groupName;

    if (!name || name.length < 1 || name.length > 50) {
      this.setState({ errorMessage: GROUP_NAME_LENGTH_ERROR_MESSAGE });
      return;
    }
    // TODO: send request to the server
    var self = this;
    $.ajax({
      method: "POST",
      type: "POST",
      url: self.props.actionLink,
      data: {
        GroupID: self.props.info.GroupID,
        GroupName: name
      },
      success: function () {
        // Show alert message with reactivity
        self.setState({ alertMessage: '' });
        self.setState({ alertMessage: SUCCESS_UPDATE_MESSAGE });
      },
      error: function () {
        // Show inner alert with no reactivity
        self.setState({ errorMessage: DATABASE_ERROR_MESSAGE });
        $('.group-settings .alert.alert-danger').show();
      }
    });
  },
  render: function () {
    return (
      <div className="group-settings">
        <div className="form-group row">
          <span className="col-xs-2">
            <label htmlFor="tutorName">Преподаватель:</label>
          </span>
          <div className="col-xs-10">
            <b>{this.props.info.TutorName}</b>
          </div>
        </div>
        <div className="form-group has-feedback row">
          <div className="col-xs-12">
            <label htmlFor="groupName">Название учебной группы:</label>
          </div>
          <div className="col-xs-12">
            <input id="groupName" className="form-control" type="text" value={this.state.groupName} onChange={this.handleGroupNameChange} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-10">
            <button className="btn btn-default " onClick={this.handleSubmit}>Сохранить изменения</button>
          </div>
        </div>
        {this.state.errorMessage.length > 0 &&
          <div className="alert alert-danger fade in">
            {this.state.errorMessage}
          </div>
        }
        <Alert message={this.state.alertMessage} time={1500} />
      </div>
    );
  }
});