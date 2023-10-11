var usersArray = [{ full_name: "", job_role: "", email: "", user_level: "" }];
function loadAdditionalUserFrom(_data = []) {
  if (_data.length > 0) {
    usersArray = _data;
  }
  let _html = "";
  for (let i = 0; i < usersArray.length; i++) {
    let _close_btn_html =
      i > 0
        ? '<button class="btn_remove_more" id="' +
          i +
          '" type="button"><img src="./images/wh-close.png" /></button>'
        : "";
    _html += `
    <div class="usersList">
                                    <h2>User ${i + 1}</h2>
                                    ${_close_btn_html}
                                    <div class="formField">
                                        <input type="text" name="full_name[]" value="${
                                          usersArray[i].full_name
                                        }" placeholder="Full Name"
                                            autocomplete="off" />
                                    </div>
                                    <div class="formField">
                                        <input type="text" name="job_role[]" value="${
                                          usersArray[i].job_role
                                        }" placeholder="Job Role"
                                            autocomplete="off" />
                                    </div>
                                    <div class="formField">
                                        <input type="email" name="email[]" value="${
                                          usersArray[i].email
                                        }" placeholder="Email"
                                            autocomplete="off" />
                                    </div>
                                    <div class="formField">
                                        <select name="user_level[]" autocomplete="off">
                                            <option value="0">Select User Level</option>
                                            <option value="1" ${
                                              usersArray[i].user_level == "1"
                                                ? "selected"
                                                : ""
                                            }>User Level 1</option>
                                            <option value="2" ${
                                              usersArray[i].user_level == "2"
                                                ? "selected"
                                                : ""
                                            }>User Level 2</option>
                                            <option value="3" ${
                                              usersArray[i].user_level == "3"
                                                ? "selected"
                                                : ""
                                            }>User Level 3</option>
                                            <option value="4" ${
                                              usersArray[i].user_level == "4"
                                                ? "selected"
                                                : ""
                                            }>User Level 4</option>
                                        </select>
                                    </div>
                                </div>`;
  }

  $("#user_list_wrapper").html(_html);
}
function set_form_two_data(data) {
  let checked_server = data.server;
  let checked_install = data.install;
  $('input[name="server"][value="' + checked_server + '"]').prop(
    "checked",
    true
  );
  $('input[name="install"][value="' + checked_install + '"]').prop(
    "checked",
    true
  );

  $('input[name="server_access"]').val(data.server_access);
  $('input[name="server_address"]').val(data.server_address);
  $('input[name="server_username"]').val(data.server_username);
  $('input[name="server_password"]').val(data.server_password);
  $('input[name="cms_web_url"]').val(data.cms_web_url);
  $('input[name="cms_username"]').val(data.cms_username);
  $('input[name="cms_password"]').val(data.cms_password);
}

function loadFormTwoData() {
  if (edit_mode()) {
    get_data_from_api(
      get_id_from_localStorage("user_id"),
      function (responseData) {
        // Handle the response data here
        let data = {
          server: responseData.data.form_two.server,
          install: responseData.data.form_two.install,
          server_access: responseData.data.form_two.server_access,
          server_address: responseData.data.form_two.server_address,
          server_username: responseData.data.form_two.server_username,
          server_password: responseData.data.form_two.server_password,
          cms_web_url: responseData.data.form_two.cms_web_url,
          cms_username: responseData.data.form_two.cms_username,
          cms_password: responseData.data.form_two.cms_password,
        };
        set_form_two_data(data);

        loadAdditionalUserFrom(responseData.data.form_two.additional_users);
      }
    );
  } else {
    let data = [];
    loadAdditionalUserFrom(data);
  }
}

function formTwoInitListeners() {
  $(document).on("click", "#add_more_user", function () {
    usersArray = [];
    let full_name = $('input[name="full_name[]"]');
    let job_role = $('input[name="job_role[]"]');
    let email = $('input[name="email[]"]');
    let user_level = $('select[name="user_level[]"]');

    let userLevelValues = []; // Store select field values

    for (let i = 0; i < full_name.length; i++) {
      let userObj = {
        full_name: $(full_name[i]).val(),
        job_role: $(job_role[i]).val(),
        email: $(email[i]).val(),
        user_level: $(user_level[i]).val(),
      };
      usersArray.push(userObj);
      userLevelValues.push($(user_level[i]).val()); // Store select field value
    }
    usersArray.push({ full_name: "", job_role: "", email: "", user_level: "" }); // adding empty form
    loadAdditionalUserFrom([]);

    // Set the select field values back after rebuilding the form
    for (let i = 0; i < userLevelValues.length; i++) {
      $(user_level[i]).val(userLevelValues[i]);
    }
  });

  $(document).on("click", ".btn_remove_more", function () {
    let _index = $(this).attr("id");
    usersArray.splice(_index, 1);
    loadAdditionalUserFrom();
  });

  $(document).on("submit", "#form2", function (e) {
    // console.log("form 2");
    e.preventDefault();

    let _id = get_id_from_localStorage("user_id");
    const formData2 = new FormData($("#form2")[0]);
    const formDataObject2 = {};

    for (const [key, value] of formData2.entries()) {
      if (formDataObject2[key]) {
        if (Array.isArray(formDataObject2[key])) {
          formDataObject2[key].push(value);
        } else {
          formDataObject2[key] = [formDataObject2[key], value];
        }
      } else {
        formDataObject2[key] = value;
      }
    }
    // Make an AJAX POST request to the API using jQuery
    $.ajax({
      url: "http://localhost:3000/api/v1/universities/form-two/" + _id,
      method: "PUT",
      contentType: "application/x-www-form-urlencoded", // or 'multipart/form-data' if needed
      dataType: "json", // Specify the expected data type (JSON in this case)
      data: formDataObject2,
      success: function (response) {
        // set_id_to_localstorage(storageKey, response.data._id);
        loadDataInSummery();
        $(".reeled-board").removeClass("active");
        $("#boarding-form-3").addClass("active");
        alert("Successfully Saved");
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Request failed with status:", textStatus);
        console.error("Error details:", xhr.responseText);
      },
    });
  });
}
const hybridForm = () => {
  $(document).on("change", ".server_install:checked", function () {
    let _val = $(".server_install:checked").val();
    // alert(_val);
    if (_val === "hybrid_install") {
      $("#hybrid_form.form_two_block").addClass("active");
    } else {
      $("#hybrid_form.form_two_block").removeClass("active");
    }
  });
};

$(document).ready(function () {
  hybridForm();
  formTwoInitListeners();
  loadFormTwoData();
});
