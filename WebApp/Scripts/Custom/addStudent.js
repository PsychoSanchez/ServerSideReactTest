(function (params) {
    const INFO_ALERT = `<div class="alert alert-info fade in alert-dismissable">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
          Этот пользователь уже состоит в данной группе.
        </div>`;
    var $workersDd = $('#workers-dropdown');
    var $organisationsDd = $('#organisations-dropdown');
    var $addStudentBtn = $('.add-student-btn');

    // Filters DropDown
    function filterOptions(curOrganisation) {
        var selectedValue = -1;
        $workersDd.find('option').each(function () {
            let $elem = $(this);
            var organisationId = $elem.val().split('_')[1];
            var isOrganistion = curOrganisation === organisationId;
            var action = 'hide';
            if (isOrganistion) {
                action = 'show';
                // update selected value, also check for elements count 
                if (selectedValue === -1) {
                    selectedValue = $elem.val();
                }
            }
            $elem[action]();
        });

        let disable = (selectedValue === -1) ? 'disabled' : false;
        $workersDd.prop('disabled', disable).val(selectedValue);
        $addStudentBtn.prop('disabled', disable);
    };

    // Returns parameters given in link
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    $organisationsDd.change(function (event) {
        filterOptions($(this).val());
    });

    $addStudentBtn.click(function (params) {
        var worker = $workersDd.val();
        if (worker === null) {
            // ToDo Alert
            return;
        }
        var workerId = worker.split('_')[0];
        var groupId = getParameterByName('GroupId');
        $.ajax({
            type: 'POST',
            url: '/Groups/AddStudent',
            data: {
                WorkerID: workerId,
                GroupID: groupId
            },
            success: function (response) {
                switch (response.result) {
                    case 'Added':
                        window.location = '/Groups/Edit/' + groupId
                        break;
                    case 'Exist':
                        $addStudentBtn.parent().parent().after(INFO_ALERT);
                        break;
                    default:
                        // TODO: database failure or unknow error
                        break;
                }
            },
            error: function (params) {

            }
        });
    });


    filterOptions($organisationsDd.val());
})();
