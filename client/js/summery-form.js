function sumeryBucketData(bucketData) {
  console.log("bucketList in summery", bucketData);
  let bucketListHtml = "";
  bucketData.map((bucket, index) => {
    const _bucketItemHtml = `
          <div class="bucketList">
            <h2>Bucket ${index + 1}</h2>
            <div class="formField">
              <input type="text" name="bucket_name[]" placeholder="Bucket Name" autocomplete="off" value="${
                bucket.bucket_name
              }" />
            </div>
            <div class="formField">
              <input type="text" name="bucket_areas[]" placeholder="Bucket Page or Website Areas" autocomplete="off" value="${
                bucket.bucket_areas
              }" />
            </div>
            <div class="formField fullwidth">
              <textarea name="bucket_brief[]" placeholder="Additional Buckets Brief:" autocomplete="off">${
                bucket.bucket_brief
              }</textarea>
            </div>
          </div>`;
    bucketListHtml += _bucketItemHtml;
  });
  $("#summery_bucket_list_wrapper").html(bucketListHtml);
}
function summeryAdditionalUserFrom(userData) {
  let userListHtml = "";
  userData.map((user, index) => {
    const _userItemHtml = `
    <div class="usersList">
                                    <h2>User ${index + 1}</h2>
                                    <div class="formField">
                                        <input type="text" name="full_name[]" value="${
                                          user.full_name
                                        }" placeholder="Full Name"
                                            autocomplete="off" />
                                    </div>
                                    <div class="formField">
                                        <input type="text" name="job_role[]" value="${
                                          user.job_role
                                        }" placeholder="Job Role"
                                            autocomplete="off" />
                                    </div>
                                    <div class="formField">
                                        <input type="email" name="email[]" value="${
                                          user.email
                                        }" placeholder="Email"
                                            autocomplete="off" />
                                    </div>
                                    <div class="formField">
                                        <select name="user_level[]" autocomplete="off">
                                            <option value="0">Select User Level</option>
                                            <option value="1" ${
                                              user.user_level == "1"
                                                ? "selected"
                                                : ""
                                            }>User Level 1</option>
                                            <option value="2" ${
                                              user.user_level == "2"
                                                ? "selected"
                                                : ""
                                            }>User Level 2</option>
                                            <option value="3" ${
                                              user.user_level == "3"
                                                ? "selected"
                                                : ""
                                            }>User Level 3</option>
                                            <option value="4" ${
                                              user.user_level == "4"
                                                ? "selected"
                                                : ""
                                            }>User Level 4</option>
                                        </select>
                                    </div>
                                </div>`;
    userListHtml += _userItemHtml;
  });
  $("#summery_user_list_wrapper").html(userListHtml);
}
function get_hybrid_details(form_two) {
  let _dataHtml = `<div class="frontCol">
                                <h4>Server Access</h4>
                                <div class="formField">
                                    <label>Server Access</label>
                                    <input type="text" value="${form_two.server_access}" placeholder="Server Access" />
                                </div>
                                <div class="formField">
                                    <label>Server Address</label>
                                    <input type="text" value="${form_two.server_address}" placeholder="Server Address" />
                                </div>
                                <div class="formField">
                                    <label>Username</label>
                                    <input type="text" value="${form_two.server_username}" placeholder="Username" />
                                    <div data-lastpass-icon-root="true"
                                        style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;">
                                    </div>
                                </div>
                                <div class="formField">
                                    <label>Password</label>
                                    <input type="password" value="${form_two.server_password}" placeholder="Password" />
                                    <div data-lastpass-icon-root="true"
                                        style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;">
                                    </div>
                                </div>
                            </div> <div class="backCol">
                                <h4>Website CMS Logins</h4>
                                <div class="formField">
                                    <label>URL</label>
                                    <input type="text" value="${form_two.cms_web_url}" placeholder="URL" />
                                </div>
                                <div class="formField">
                                    <label>Username</label>
                                    <input type="text" value="${form_two.cms_username}" placeholder="Username" />
                                    <div data-lastpass-icon-root="true"
                                        style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;">
                                    </div>
                                </div>
                                <div class="formField">
                                    <label>Password</label>
                                    <input type="password" value="${form_two.cms_password}" placeholder="Password" />
                                    <div data-lastpass-icon-root="true"
                                        style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;">
                                    </div>
                                </div>
                            </div>`;
  return form_two.install === "self_install" ? "" : _dataHtml;
}

function set_summery_form_data(data) {
  let form_one = data.form_one;
  let form_two = data.form_two;
  let _html = `<div class="topBlock">
                            <div class="formField">
                                <label>University Name</label>
                                <input type="text" value="${
                                  form_one.uni_name
                                }" placeholder="University Name" />
                            </div>
                            <div class="formField">
                                <label>Contact Name</label>
                                <input type="text" value="${
                                  form_one.contact_name
                                }" placeholder="Contact Name" />
                            </div>
                            <div class="formField">
                                <label>Website URL</label>
                                <input type="text" value="${
                                  form_one.website_url
                                }" placeholder="Website URL" />
                            </div>
                            <div class="formField">
                                <label>Email</label>
                                <input type="email" value="${
                                  form_one.email
                                }" placeholder="Email" />
                                <div data-lastpass-icon-root="true"
                                    style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;">
                                </div>
                            </div>
                        </div>
                        <div class="bottomBlock">
                            <div id="summery_bucket_list_wrapper"></div>
                        </div>
                        <div class="optionBlock">
                            <h4>Server and User Details</h4>
                            <div class="option">
                                <input type="radio" ${
                                  form_two.server == "staging_server"
                                    ? "checked"
                                    : ""
                                }/>
                                <label>Staging Server</label>
                            </div>
                            <div class="option disabled">
                                <input type="radio" ${
                                  form_two.server == "live_server"
                                    ? "checked"
                                    : ""
                                }/>
                                <label>Live Server</label>
                            </div>
                            <div class="option disabled">
                                <input type="radio" ${
                                  form_two.install == "self_install"
                                    ? "checked"
                                    : ""
                                }/>
                                <label>Self Install</label>
                            </div>
                            <div class="option">
                                <input type="radio" ${
                                  form_two.install == "hybrid_install"
                                    ? "checked"
                                    : ""
                                }/>
                                <label>Hybrid Install</label>
                            </div>
                        </div>
                        <div class="divider">
                            ${get_hybrid_details(form_two)}
                        </div>

                        <div class="bottomBlock">
                            <div class="addUsers">
                                <h4>Additional Users</h4>
                                <div id="summery_user_list_wrapper"></div>
                            </div>
                        </div>
                        <div class="navWrap">
                            <button type="button" class="transparent summery-prev"
                                data-id="boarding-form-2">Back</button>
                            <button type="button" class="summery-next" data-id="boarding-form-4">Next</button>
                        </div>`;

  $("#summery_form").html(_html);
  $(document).on("click", ".summery-next, .summery-prev", function () {
    let _id = $(this).attr("data-id");
    $(".reeled-board").removeClass("active");
    $("#" + _id).addClass("active");
  });
}
function loadDataInSummery() {
  if (edit_mode()) {
    get_data_from_api(
      get_id_from_localStorage("user_id"),
      function (responseData) {
        // Handle the response data here
        let data = {
          form_one: responseData.data.form_one,
          form_two: responseData.data.form_two,
        };
        set_summery_form_data(data);

        sumeryBucketData(responseData.data.form_one.buckets);
        summeryAdditionalUserFrom(responseData.data.form_two.additional_users);
      }
    );
  } else {
    $("#summery_form").html(`<p>No Summery Data Found!!!</p>`);
  }
}

$(document).ready(function () {
  loadDataInSummery();
});
