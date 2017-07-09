var siteMap = {
    studyGroups: './Groups/Index',
    createGroup:  './Groups/Create'
};

var Breadcrumps = React.createClass({
  render: function() {
    return (
     <div></div>
    );
  }
});

ReactDOM.render(
  <Breadcrumps />,
  document.querySelector('#breadcrumps')
);